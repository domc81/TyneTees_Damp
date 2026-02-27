'use client'

import { useState, useRef, useEffect } from 'react'
import { Mic, Square, Loader2, AlertCircle } from 'lucide-react'

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
  const [state, setState] = useState<RecordingState>('idle')
  const [error, setError] = useState<string | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

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
      // Check browser support
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Audio recording is not supported in your browser')
        setState('error')
        return
      }

      // Request microphone access with quality constraints
      // Noise suppression + echo cancellation are critical for on-site recording
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: { ideal: 48000 },
          channelCount: { ideal: 1 },
        },
      })
      streamRef.current = stream

      // Create MediaRecorder with explicit bitrate for clear speech
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
        audioBitsPerSecond: 128000,
      })
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      // Collect audio chunks
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      // Handle recording stop
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' })
        await transcribeAudio(audioBlob)

        // Cleanup stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop())
          streamRef.current = null
        }
      }

      // Start recording
      mediaRecorder.start()
      setState('recording')
      setRecordingTime(0)

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = prev + 1
          // Auto-stop at max duration
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

  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }
  }

  const transcribeAudio = async (audioBlob: Blob) => {
    setState('processing')

    try {
      // Create form data
      const formData = new FormData()
      formData.append('audio', audioBlob, 'recording.webm')

      // Send to transcription API
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Transcription failed')
      }

      const result = await response.json()

      if (!result.text || result.text.trim() === '') {
        setError('No speech detected. Please try again.')
        setState('error')
        return
      }

      // Success!
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
          <span className="text-sm text-white/70">Transcribing...</span>
        </div>
      )}

      {state === 'error' && error && (
        <div className="space-y-3">
          {/* Error message */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-200 flex-1">{error}</p>
          </div>

          {/* Try again button */}
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
    </div>
  )
}
