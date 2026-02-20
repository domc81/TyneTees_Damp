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
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30-second timeout

    try {
      const deepgramResponse = await fetch(
        'https://api.deepgram.com/v1/listen?' +
          new URLSearchParams({
            model: 'nova-2',
            language: 'en-GB',
            smart_format: 'true',
            punctuate: 'true',
            diarize: 'false',
          }),
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

      // Return result
      const result: TranscriptionResult = {
        text: transcript,
        confidence: Math.round(confidence * 100) / 100, // Round to 2 decimal places
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
