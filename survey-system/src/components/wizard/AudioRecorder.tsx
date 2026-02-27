'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Mic, Square, Loader2, AlertCircle, Play } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

// =============================================================================
// WAV Encoding Utilities
// Converting MediaRecorder's WebM to WAV (16kHz PCM) before sending to Deepgram
// eliminates all container/codec parsing issues. WAV is raw uncompressed audio —
// there's nothing for Deepgram's decoder to misinterpret.
// =============================================================================

function writeString(view: DataView, offset: number, str: string) {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i))
  }
}

function encodeWav(samples: Float32Array, sampleRate: number): ArrayBuffer {
  const numSamples = samples.length
  const buffer = new ArrayBuffer(44 + numSamples * 2)
  const view = new DataView(buffer)

  // RIFF header
  writeString(view, 0, 'RIFF')
  view.setUint32(4, 36 + numSamples * 2, true)
  writeString(view, 8, 'WAVE')

  // fmt subchunk
  writeString(view, 12, 'fmt ')
  view.setUint32(16, 16, true)     // subchunk size
  view.setUint16(20, 1, true)      // PCM format
  view.setUint16(22, 1, true)      // mono
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * 2, true) // byte rate
  view.setUint16(32, 2, true)      // block align
  view.setUint16(34, 16, true)     // bits per sample

  // data subchunk
  writeString(view, 36, 'data')
  view.setUint32(40, numSamples * 2, true)

  // Convert float samples to 16-bit PCM
  for (let i = 0; i < numSamples; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]))
    view.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true)
  }

  return buffer
}

async function convertWebmToWav(webmBlob: Blob): Promise<Blob> {
  // 16kHz is optimal for speech recognition — Deepgram recommends it.
  // AudioContext resamples from the recording's 48kHz automatically.
  const targetRate = 16000
  const audioContext = new AudioContext({ sampleRate: targetRate })

  try {
    const arrayBuffer = await webmBlob.arrayBuffer()
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

    const samples = audioBuffer.getChannelData(0) // mono
    const actualRate = audioBuffer.sampleRate

    console.log(
      `[AudioRecorder] WAV conversion: ${audioBuffer.duration.toFixed(1)}s, ${actualRate}Hz, ${samples.length} samples → ${(samples.length * 2 / 1024).toFixed(0)}KB WAV`
    )

    const wavBuffer = encodeWav(samples, actualRate)
    return new Blob([wavBuffer], { type: 'audio/wav' })
  } finally {
    await audioContext.close()
  }
}

// =============================================================================
// AudioRecorder Component
// =============================================================================

interface AudioRecorderProps {
  onTranscriptionComplete: (text: string) => void
  disabled?: boolean
  className?: string
}

type RecordingState = 'idle' | 'recording' | 'processing' | 'error'

export default function AudioRecorder({
  onTranscriptionComplete,
  disabled = false,
  className = '',
}: AudioRecorderProps) {
  const { isAdmin } = useAuth()
  const [state, setState] = useState<RecordingState>('idle')
  const [error, setError] = useState<string | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [skipKeyterms, setSkipKeyterms] = useState(false)
  const [debugAudioUrl, setDebugAudioUrl] = useState<string | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  // Ref mirrors recordingTime state so async callbacks (onstop) get the latest value
  const recordingTimeRef = useRef(0)

  const MAX_RECORDING_SECONDS = 120

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRecording()
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (debugAudioUrl) {
        URL.revokeObjectURL(debugAudioUrl)
      }
    }
  }, [])

  // Auto-dismiss error after 5 seconds
  useEffect(() => {
    if (state === 'error') {
      const timeout = setTimeout(() => {
        setState('idle')
        setError(null)
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [state])

  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Audio recording is not supported in your browser')
        setState('error')
        return
      }

      // Revoke previous debug audio URL
      if (debugAudioUrl) {
        URL.revokeObjectURL(debugAudioUrl)
        setDebugAudioUrl(null)
      }

      // Request microphone access.
      // echoCancellation OFF — there's no speaker output to cancel in a field
      // recording; enabling it in reverberant spaces (basements, empty rooms)
      // can cause the algorithm to cancel the surveyor's own voice reflections.
      // noiseSuppression ON — helps with ambient construction noise.
      // autoGainControl ON — normalises volume across varying distances from mic.
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: { ideal: 48000 },
          channelCount: { ideal: 1 },
        },
      })
      streamRef.current = stream

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
        audioBitsPerSecond: 128000,
      })
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      // DEBUG: Log configuration
      console.log('[AudioRecorder] Requested mimeType: audio/webm')
      console.log('[AudioRecorder] Actual mimeType:', mediaRecorder.mimeType)
      console.log('[AudioRecorder] audioBitsPerSecond:', mediaRecorder.audioBitsPerSecond)

      const audioTrack = stream.getAudioTracks()[0]
      if (audioTrack) {
        console.log('[AudioRecorder] Audio track settings:', JSON.stringify(audioTrack.getSettings()))
      }

      // Collect audio chunks
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      // Handle recording stop — convert WebM → WAV then transcribe
      mediaRecorder.onstop = async () => {
        const webmBlob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const duration = recordingTimeRef.current

        console.log(`[AudioRecorder] Recording stopped: ${duration}s, ${chunksRef.current.length} chunks, ${(webmBlob.size / 1024).toFixed(0)}KB WebM`)

        // Create debug playback URL from original WebM (admin can listen)
        setDebugAudioUrl(URL.createObjectURL(webmBlob))

        try {
          // Convert to WAV — eliminates WebM container parsing issues
          setState('processing')
          const wavBlob = await convertWebmToWav(webmBlob)
          console.log(`[AudioRecorder] WAV blob: ${(wavBlob.size / 1024).toFixed(0)}KB`)

          await transcribeAudio(wavBlob, duration)
        } catch (conversionErr) {
          console.warn('[AudioRecorder] WAV conversion failed, falling back to WebM:', conversionErr)
          // Fallback: send original WebM if conversion fails
          await transcribeAudio(webmBlob, duration)
        }

        // Cleanup stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop())
          streamRef.current = null
        }
      }

      // Start recording — no timeslice produces a single valid WebM blob.
      // We tried timeslice=1000 but it produced worse results (fragmented
      // WebM container with incomplete cluster headers).
      mediaRecorder.start()
      setState('recording')
      setRecordingTime(0)
      recordingTimeRef.current = 0

      // Start timer — updates both state (for UI) and ref (for async callbacks)
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = prev + 1
          recordingTimeRef.current = newTime
          if (newTime >= MAX_RECORDING_SECONDS) {
            stopRecording()
          }
          return newTime
        })
      }, 1000)
    } catch (err) {
      console.error('Error starting recording:', err)
      if (err instanceof DOMException && err.name === 'NotAllowedError') {
        setError(
          'Microphone access denied. Please allow microphone access in your browser settings.'
        )
      } else {
        setError('Failed to start recording. Please check your microphone.')
      }
      setState('error')
    }
  }

  const stopRecording = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }
  }, [])

  const transcribeAudio = async (audioBlob: Blob, duration: number) => {
    setState('processing')

    try {
      console.log('[AudioRecorder] ---- SENDING TO API ----')
      console.log(`[AudioRecorder] Format: ${audioBlob.type}, Size: ${(audioBlob.size / 1024).toFixed(1)}KB, Recorded: ${duration}s`)

      // Create form data with recorded duration for server-side diagnostics
      const formData = new FormData()
      const filename = audioBlob.type === 'audio/wav' ? 'recording.wav' : 'recording.webm'
      formData.append('audio', audioBlob, filename)
      formData.append('recordedDuration', duration.toString())

      const transcribeUrl = skipKeyterms ? '/api/transcribe?debug=nokeys' : '/api/transcribe'
      const response = await fetch(transcribeUrl, {
        method: 'POST',
        body: formData,
      })

      console.log('[AudioRecorder] Response status:', response.status, response.statusText)

      if (!response.ok) {
        const errorData = await response.json()
        console.error('[AudioRecorder] Error response:', JSON.stringify(errorData))
        throw new Error(errorData.error || 'Transcription failed')
      }

      const result = await response.json()

      console.log('[AudioRecorder] Transcript:', result.text)
      console.log('[AudioRecorder] Confidence:', result.confidence)
      console.log('[AudioRecorder] Duration:', result.duration, 'seconds')
      if (result.diagnostics) {
        const d = result.diagnostics
        console.log('[AudioRecorder] ===== TRUNCATION CHECK =====')
        console.log(`[AudioRecorder] You recorded:     ${d.clientRecordedDuration}s`)
        console.log(`[AudioRecorder] Deepgram received: ${d.deepgramDuration}s`)
        console.log(`[AudioRecorder] Duration gap:      ${d.durationGap}s ${Number(d.durationGap) > 3 ? '⚠️ AUDIO TRUNCATED!' : '✓ OK'}`)
        console.log(`[AudioRecorder] File size:         ${d.fileSizeKB}KB`)
        console.log(`[AudioRecorder] Words returned:    ${d.wordCount} (expected ~${d.expectedWords})`)
        console.log('[AudioRecorder] ============================')
      }

      if (!result.text || result.text.trim() === '') {
        setError('No speech detected. Please try again.')
        setState('error')
        return
      }

      onTranscriptionComplete(result.text)
      setState('idle')
      setError(null)
    } catch (err) {
      console.error('Transcription error:', err)
      setError(err instanceof Error ? err.message : 'Transcription failed')
      setState('error')
    }
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Main Controls */}
      {state === 'idle' && (
        <button
          onClick={startRecording}
          disabled={disabled}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Mic className="w-5 h-5 text-white/70" />
          <span className="text-sm font-medium text-white/90">Record Voice Note</span>
        </button>
      )}

      {state === 'recording' && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
          {/* Pulsing indicator */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-3 h-3 bg-red-500 rounded-full animate-ping" />
            <div className="relative w-3 h-3 bg-red-500 rounded-full" />
          </div>

          {/* Timer */}
          <div className="flex-1 text-white/90 font-mono text-lg">
            {formatTime(recordingTime)}
          </div>

          {/* Stop button */}
          <button
            onClick={stopRecording}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors flex items-center gap-2"
          >
            <Square className="w-4 h-4" />
            Stop
          </button>
        </div>
      )}

      {state === 'processing' && (
        <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
          <Loader2 className="w-5 h-5 text-brand-400 animate-spin" />
          <span className="text-sm text-white/70">Converting &amp; transcribing...</span>
        </div>
      )}

      {state === 'error' && error && (
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-200 flex-1">{error}</p>
          </div>

          <button
            onClick={() => {
              setState('idle')
              setError(null)
            }}
            className="w-full px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 text-sm font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Helper text */}
      {state === 'idle' && !error && (
        <p className="text-xs text-white/50 text-center">
          Record up to {MAX_RECORDING_SECONDS / 60} minutes of audio
        </p>
      )}

      {/* Admin-only debug controls */}
      {isAdmin && (
        <div className="flex flex-col items-center gap-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={skipKeyterms}
              onChange={(e) => setSkipKeyterms(e.target.checked)}
              className="w-3 h-3 rounded border-white/20 bg-white/5 accent-amber-500"
            />
            <span className="text-[11px] text-amber-400/70">Debug: skip keyterms</span>
          </label>

          {/* Debug playback — lets admin hear what was captured */}
          {debugAudioUrl && (
            <div className="flex items-center gap-2 mt-1">
              <Play className="w-3 h-3 text-amber-400/70" />
              <audio controls src={debugAudioUrl} className="h-6" style={{ maxWidth: '200px' }} />
              <span className="text-[11px] text-amber-400/50">recorded audio</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
