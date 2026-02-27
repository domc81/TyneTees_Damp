// =============================================================================
// Speech-to-Text API Route — Deepgram Transcription
// Accepts audio recordings and returns transcribed text
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'

interface TranscriptionResult {
  text: string
  confidence: number
  duration: number
}

interface DeepgramResponse {
  results: {
    channels: Array<{
      alternatives: Array<{
        transcript: string
        confidence: number
      }>
    }>
  }
  metadata: {
    duration: number
  }
}

/**
 * POST /api/transcribe
 * Transcribes audio file using Deepgram API
 */
export async function POST(request: NextRequest) {
  try {
    // Check for Deepgram API key
    const apiKey = process.env.DEEPGRAM_API_KEY
    if (!apiKey) {
      console.error('DEEPGRAM_API_KEY not configured')
      return NextResponse.json(
        { error: 'Speech-to-text service not configured' },
        { status: 500 }
      )
    }

    // Parse multipart form data
    const formData = await request.formData()
    const audioFile = formData.get('audio') as File
    const clientRecordedDuration = parseFloat(formData.get('recordedDuration') as string) || 0

    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      )
    }

    // DEBUG: Log received file details
    console.log('[Transcribe DEBUG] ---- RECEIVED FILE ----')
    console.log('[Transcribe DEBUG] File name:', audioFile.name)
    console.log('[Transcribe DEBUG] File type (MIME):', audioFile.type)
    console.log('[Transcribe DEBUG] File size:', audioFile.size, 'bytes', `(${(audioFile.size / 1024).toFixed(1)} KB)`)
    console.log('[Transcribe DEBUG] Client recorded duration:', clientRecordedDuration, 'seconds')
    // Flag suspiciously small files. WAV 16kHz mono = ~32KB/sec, WebM 128kbps = ~16KB/sec.
    const isWavFormat = audioFile.type === 'audio/wav'
    const expectedMinBytes = clientRecordedDuration * (isWavFormat ? 20000 : 8000)
    if (clientRecordedDuration > 0 && audioFile.size < expectedMinBytes) {
      console.warn(`[Transcribe DEBUG] ⚠️ FILE SIZE SUSPICIOUSLY SMALL: ${audioFile.size} bytes for ${clientRecordedDuration}s recording (expected at least ${expectedMinBytes} bytes)`)
    }

    // Validate file type
    const validTypes = ['audio/webm', 'audio/wav', 'audio/mp3', 'audio/ogg']
    if (!validTypes.includes(audioFile.type)) {
      console.error('[Transcribe DEBUG] REJECTED — invalid MIME type:', audioFile.type)
      return NextResponse.json(
        { error: 'Invalid audio format. Supported: WebM, WAV, MP3, OGG' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const arrayBuffer = await audioFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // DEBUG: Verify audio header
    const headerHex = buffer.subarray(0, 16).toString('hex').match(/.{1,2}/g)?.join(' ') || ''
    console.log('[Transcribe DEBUG] First 16 bytes (hex):', headerHex)
    const isWebM = buffer[0] === 0x1a && buffer[1] === 0x45 && buffer[2] === 0xdf && buffer[3] === 0xa3
    const isWav = buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 // "RIFF"
    console.log('[Transcribe DEBUG] Format detected:', isWav ? 'WAV (PCM)' : isWebM ? 'WebM' : 'unknown')
    console.log('[Transcribe DEBUG] Buffer length matches file size:', buffer.length === audioFile.size)

    // Debug mode: skip keyterms when ?debug=nokeys is passed
    const debugMode = request.nextUrl.searchParams.get('debug')
    const skipKeyterms = debugMode === 'nokeys'
    if (skipKeyterms) {
      console.log('[Transcribe DEBUG] ⚠️ KEYTERMS BYPASSED — debug=nokeys mode')
    }

    // Send to Deepgram API
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 60000) // 60-second timeout

    // Domain-specific keyterms for Nova-3 contextual prompting.
    // Plain strings (no intensifiers) — Nova-3 uses these to understand the domain.
    // 93 keyterms total (max 100).
    const keyterms = [
      // --- Single words (48) ---
      'airbrick', 'airbricks', 'efflorescence', 'hygroscopic', 'delamination',
      'spalling', 'friable', 'protimeter', 'mycelium', 'hyphae',
      'frass', 'soakaway', 'soffit', 'fascia', 'flashing',
      'coping', 'parapet', 'quoin', 'reveal', 'cill',
      'architrave', 'coving', 'artex', 'screed', 'oversite',
      'substrate', 'stretcher', 'lintel', 'lintels', 'repointing',
      'tanking', 'membrane', 'ventilation', 'subfloor', 'guttering',
      'downpipe', 'roofline', 'gulley', 'humidistat', 'skirting',
      'plasterwork', 'render', 'joists', 'floorboards', 'mortar',
      'sandstone', 'nitrates', 'sulphates',

      // --- Multi-word phrases (45) ---
      'damp proof course', 'damp proof membrane', 'rising damp', 'penetrating damp',
      'lateral damp', 'hygroscopic salts', 'salt contamination', 'tide mark',
      'blown plaster', 'tanking slurry', 'cementitious render', 'breathable render',
      'lime mortar', 'lime plaster', 'calcium chloride', 'carbide meter',
      'wood moisture equivalent', 'BRE digest', 'dry rot', 'wet rot',
      'serpula lacrymans', 'death watch beetle', 'common furniture beetle',
      'house longhorn beetle', 'fruiting body', 'flight holes',
      'positive input ventilation', 'trickle vent', 'extraction fan',
      'mechanical ventilation', 'hit and miss vent', 'French drain',
      'ACO drain', 'channel drain', 'hopper head', 'rainwater goods',
      'cavity wall', 'wall tie', 'weep hole', 'soldier course',
      'scope of works', 'schedule of works', 'remedial works',
      'damp meter', 'moisture reading',
    ]

    try {
      // Build query params with Nova-3 keyterm prompting
      const params = new URLSearchParams({
        model: 'nova-3',
        language: 'en-GB',
        smart_format: 'true',
        punctuate: 'true',
        diarize: 'false',
        filler_words: 'false',
        utterances: 'false',
        // Disable endpointing — prevents Deepgram from stopping transcription
        // early when it detects a pause in speech. Critical for surveyor recordings
        // where pauses between observations are normal.
        endpointing: 'false',
      })
      // Nova-3 keyterms: each appended as a separate keyterm= param
      if (!skipKeyterms) {
        keyterms.forEach((kt) => params.append('keyterm', kt))
      }

      // DEBUG: Log exactly what we're sending to Deepgram
      const deepgramUrl = `https://api.deepgram.com/v1/listen?${params.toString()}`
      console.log('[Transcribe DEBUG] ---- DEEPGRAM REQUEST ----')
      console.log('[Transcribe DEBUG] Mode:', skipKeyterms ? 'NO KEYTERMS (debug)' : `WITH ${keyterms.length} KEYTERMS`)
      console.log('[Transcribe DEBUG] URL:', deepgramUrl)
      console.log('[Transcribe DEBUG] Content-Type header:', audioFile.type)
      console.log('[Transcribe DEBUG] Body size:', buffer.length, 'bytes')

      const deepgramResponse = await fetch(deepgramUrl, {
        method: 'POST',
        headers: {
          Authorization: `Token ${apiKey}`,
          'Content-Type': audioFile.type,
        },
        body: buffer,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // DEBUG: Log Deepgram response headers (includes rate limit info, request ID)
      console.log('[Transcribe DEBUG] ---- DEEPGRAM RESPONSE ----')
      console.log('[Transcribe DEBUG] Status:', deepgramResponse.status, deepgramResponse.statusText)
      const dgHeaders: Record<string, string> = {}
      deepgramResponse.headers.forEach((value, key) => {
        dgHeaders[key] = value
      })
      console.log('[Transcribe DEBUG] Response headers:', JSON.stringify(dgHeaders, null, 2))

      if (!deepgramResponse.ok) {
        const errorText = await deepgramResponse.text()
        console.error('[Transcribe DEBUG] Deepgram API error body:', errorText)
        return NextResponse.json(
          { error: `Transcription service error: ${deepgramResponse.status}` },
          { status: deepgramResponse.status }
        )
      }

      const data: DeepgramResponse = await deepgramResponse.json()

      // DEBUG: Log the FULL Deepgram response (not just the extracted transcript)
      console.log('[Transcribe DEBUG] Full Deepgram response:', JSON.stringify(data, null, 2))

      // Extract transcript from response
      const channels = data.results?.channels
      if (!channels || channels.length === 0) {
        return NextResponse.json(
          { error: 'No transcription returned' },
          { status: 500 }
        )
      }

      const alternatives = channels[0].alternatives
      if (!alternatives || alternatives.length === 0) {
        return NextResponse.json(
          { error: 'No transcription alternatives found' },
          { status: 500 }
        )
      }

      const transcript = alternatives[0].transcript.trim()
      const confidence = alternatives[0].confidence
      const duration = data.metadata?.duration || 0

      // ===== TRUNCATION DIAGNOSTIC SUMMARY =====
      const wordCount = transcript ? transcript.split(/\s+/).filter(Boolean).length : 0
      const expectedWords = Math.round(duration * 2.5) // ~2.5 words/sec for normal speech
      const durationMismatch = clientRecordedDuration > 0
        ? Math.abs(duration - clientRecordedDuration)
        : 0

      console.log('[Transcribe] ===== DIAGNOSTIC SUMMARY =====')
      console.log(`[Transcribe] Client recorded:  ${clientRecordedDuration}s`)
      console.log(`[Transcribe] Deepgram saw:     ${duration.toFixed(1)}s`)
      console.log(`[Transcribe] Duration gap:     ${durationMismatch.toFixed(1)}s ${durationMismatch > 3 ? '⚠️ MISMATCH' : '✓'}`)
      console.log(`[Transcribe] File size:        ${(buffer.length / 1024).toFixed(0)}KB (${(buffer.length / Math.max(duration, 1) / 1024).toFixed(1)} KB/sec)`)
      console.log(`[Transcribe] Words returned:   ${wordCount} (expected ~${expectedWords} for ${duration.toFixed(0)}s)`)
      console.log(`[Transcribe] Confidence:       ${(confidence * 100).toFixed(1)}%`)
      console.log(`[Transcribe] Transcript:       "${transcript.substring(0, 200)}${transcript.length > 200 ? '...' : ''}"`)
      console.log('[Transcribe] ================================')

      // Flag specific truncation scenarios
      if (durationMismatch > 5) {
        console.warn(`[Transcribe] ⚠️ AUDIO TRUNCATION DETECTED: Client recorded ${clientRecordedDuration}s but Deepgram only processed ${duration.toFixed(1)}s — audio data may be incomplete or WebM container is malformed`)
      }
      if (wordCount < expectedWords * 0.3 && duration > 5) {
        console.warn(`[Transcribe] ⚠️ LOW WORD COUNT: Got ${wordCount} words from ${duration.toFixed(0)}s of audio (expected ~${expectedWords}) — Deepgram may be struggling with audio quality or domain terminology`)
      }

      // Return result with diagnostics
      const result: TranscriptionResult & { debugMode?: string; diagnostics?: Record<string, unknown> } = {
        text: transcript,
        confidence: Math.round(confidence * 100) / 100,
        duration: Math.round(duration * 100) / 100,
      }

      if (skipKeyterms) {
        result.debugMode = 'nokeys'
      }

      // Include diagnostics in response for client-side debugging
      result.diagnostics = {
        clientRecordedDuration,
        deepgramDuration: Math.round(duration * 100) / 100,
        durationGap: Math.round(durationMismatch * 100) / 100,
        fileSizeKB: Math.round(buffer.length / 1024),
        wordCount,
        expectedWords,
      }

      return NextResponse.json(result)
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof Error && error.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Transcription request timed out. Please try a shorter recording.' },
          { status: 408 }
        )
      }

      throw error
    }
  } catch (error) {
    console.error('Error in /api/transcribe:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
