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

    // Domain-specific keywords help Deepgram recognise construction terminology
    const keywords = [
      'damp proof course:2',
      'DPC:2',
      'airbrick:2',
      'airbricks:2',
      'lintel:2',
      'lintels:2',
      'efflorescence:2',
      'rising damp:2',
      'penetrating damp:2',
      'condensation:2',
      'timber decay:2',
      'woodworm:2',
      'joists:2',
      'floorboards:2',
      'skirting:2',
      'plasterwork:2',
      'render:2',
      'pointing:2',
      'repointing:2',
      'tanking:2',
      'membrane:2',
      'ventilation:2',
      'subfloor:2',
      'cavity wall:2',
      'guttering:2',
      'downpipe:2',
      'roofline:2',
      'soffit:2',
      'fascia:2',
      'flashing:2',
      'salt analysis:2',
      'hygroscopic:2',
      'mortar:2',
      'brick:2',
      'sandstone:2',
      'PIV:2',
      'positive input ventilation:2',
      'damp meter:2',
      'moisture reading:2',
      'SBR:2',
    ]

    try {
      // Build query params — keywords need to be appended separately
      // as URLSearchParams doesn't handle repeated keys well
      const params = new URLSearchParams({
        model: 'nova-2',
        language: 'en-GB',
        smart_format: 'true',
        punctuate: 'true',
        diarize: 'false',
        filler_words: 'false',
        utterances: 'false',
      })
      // Deepgram accepts multiple keywords= params
      keywords.forEach((kw) => params.append('keywords', kw))

      const deepgramResponse = await fetch(
        `https://api.deepgram.com/v1/listen?${params.toString()}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Token ${apiKey}`,
            'Content-Type': audioFile.type,
          },
          body: buffer,
          signal: controller.signal,
        }
      )

      clearTimeout(timeoutId)

      if (!deepgramResponse.ok) {
        const errorText = await deepgramResponse.text()
        console.error('Deepgram API error:', errorText)
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

      // Log quality metrics for debugging transcription issues
      console.log(
        `[Transcribe] Duration: ${duration.toFixed(1)}s | Confidence: ${(confidence * 100).toFixed(1)}% | Words: ${transcript.split(' ').length} | Content-Type: ${audioFile.type} | Size: ${(buffer.length / 1024).toFixed(0)}KB`
      )

      // Warn on low confidence — may indicate poor audio quality
      if (confidence < 0.7) {
        console.warn(
          `[Transcribe] Low confidence (${(confidence * 100).toFixed(1)}%) — possible audio quality issue`
        )
      }

      // Return result
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
