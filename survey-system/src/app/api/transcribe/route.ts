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

    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const validTypes = ['audio/webm', 'audio/wav', 'audio/mp3', 'audio/ogg']
    if (!validTypes.includes(audioFile.type)) {
      return NextResponse.json(
        { error: 'Invalid audio format. Supported: WebM, WAV, MP3, OGG' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const arrayBuffer = await audioFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

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
      keyterms.forEach((kt) => params.append('keyterm', kt))

      const deepgramUrl = `https://api.deepgram.com/v1/listen?${params.toString()}`

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

      if (!deepgramResponse.ok) {
        return NextResponse.json(
          { error: `Transcription service error: ${deepgramResponse.status}` },
          { status: deepgramResponse.status }
        )
      }

      const data: DeepgramResponse = await deepgramResponse.json()

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

      const result: TranscriptionResult = {
        text: transcript,
        confidence: Math.round(confidence * 100) / 100,
        duration: Math.round(duration * 100) / 100,
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
