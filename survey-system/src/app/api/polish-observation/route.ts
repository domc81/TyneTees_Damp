// =============================================================================
// Polish Observation API Route — Voice Note Cleanup via OpenRouter
// Cleans up voice-transcribed surveyor notes into readable report text
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'

interface PolishRequest {
  text: string
}

/**
 * POST /api/polish-observation
 * Cleans up voice-transcribed text into readable survey observation text
 */
export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY not configured')
      return NextResponse.json(
        { error: 'LLM service not configured' },
        { status: 500 }
      )
    }

    const body: PolishRequest = await request.json()
    const { text } = body

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'No text provided' },
        { status: 400 }
      )
    }

    const systemPrompt = `You are a text cleanup assistant for a property surveyor. Your job is to clean up voice-transcribed notes into readable text.

RULES:
- Remove filler words: um, uh, err, ah, like, you know, sort of, kind of, basically, right, so yeah
- Remove false starts, repeated words, and self-corrections
- Fix grammar and punctuation
- Structure into clear sentences in logical order
- Keep the EXACT same observations, descriptions, and professional judgments
- Keep the surveyor's own words and phrasing where possible
- Do NOT add any information that was not in the original
- Do NOT remove any observations or details
- Do NOT change the meaning of anything
- Do NOT add professional terminology the surveyor did not use
- Do NOT add conclusions or recommendations
- Do NOT add greetings, sign-offs, or meta-commentary
- Output plain text only — no markdown, no bullet points, no headings
- Keep it concise — remove waffle but keep all substance
- British English spelling`

    const userPrompt = `Clean up this surveyor's voice note:\n\n${text}`

    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://www.tyneteesdampproofing.co.uk',
          'X-Title': 'Tyne Tees Survey System',
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.3-70b-instruct',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.1,
          max_tokens: 1000,
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenRouter API error:', errorText)
      return NextResponse.json(
        { error: `LLM service error: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()

    if (!data.choices || data.choices.length === 0) {
      return NextResponse.json(
        { error: 'No content generated' },
        { status: 500 }
      )
    }

    const polished = data.choices[0].message.content.trim()

    if (polished.length < 5) {
      return NextResponse.json(
        { error: 'Polish produced no usable text' },
        { status: 500 }
      )
    }

    return NextResponse.json({ polished })
  } catch (error) {
    console.error('Error in /api/polish-observation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
