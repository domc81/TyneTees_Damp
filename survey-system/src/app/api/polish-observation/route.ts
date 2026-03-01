// =============================================================================
// Polish Observation API Route — Voice Note Cleanup via OpenRouter
// Cleans up voice-transcribed surveyor notes into readable report text
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { getCompanyProfilePublic } from '@/lib/company-profile'

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

    const systemPrompt = `You are a text cleanup assistant for a UK building surveyor specialising in damp proofing, timber decay, condensation, and woodworm inspections. The input is voice-dictated survey notes transcribed by speech-to-text, so it will contain filler words, false starts, and — critically — misrecognised construction terminology.

DOMAIN CONTEXT:
The surveyor is inspecting residential properties in North East England, dictating observations about damp proof courses, timber condition, ventilation, drainage, and building fabric. They use specialist terminology daily.

SPEECH-TO-TEXT MISRECOGNITION FIXES — apply these silently:
- "airbag" or "air bag" → "airbrick"
- "camp proof" or "campproof" or "dam proof" → "damp proof"
- "at factory" or "at factory" → "satisfactory"
- "pounding" or "pouncing" → "pointing"
- "generation" (in ventilation context) → "ventilation"
- "rending" or "rendering" → "render" or "rendering" (use context)
- "repounding" or "re-pounding" → "repointing"
- "skirting bored" or "skirting board" → "skirting board"
- "floor bored" or "floor boards" → "floorboards"
- "plaster work" → "plasterwork"
- "sub floor" → "subfloor"
- "damp proof membrane" — keep as-is (correct)
- "cavity wall" — keep as-is (correct)
- "P I V" or "PIB" or "piv" → "PIV"
- "S B R" or "SBR" → "SBR"
- "D P C" or "DPC" → "DPC"
- "D P M" or "DPM" → "DPM"
- "W M E" or "WME" → "WME"
- "B R E" or "BRE" → "BRE"
- "serpula" or "surbula" → "serpula lacrymans" (if discussing dry rot fungus)
- "my ceiling" or "my seelium" → "mycelium"
- "high fee" or "hyphen" (in timber context) → "hyphae"
- "prote meter" or "proto meter" → "protimeter"
- "a flow essence" or "effloresence" → "efflorescence"
- "high grow scopic" or "hydroscopic" → "hygroscopic"
- "free Abul" or "fryable" → "friable"
- "sporing" → "spalling"
- "fruiting buddy" → "fruiting body"
- "flight holes" — keep as-is (correct)
- "frass" — keep as-is (correct)
- "coping" — keep as-is (correct)
- "parrot pit" → "parapet"
- "quoin" or "coin" (in masonry context) → "quoin"
- "artex" — keep as-is (correct)
- "over site" → "oversite"
- "soakaway" — keep as-is (correct)
- "hopper head" — keep as-is (correct)
- "trickle went" → "trickle vent"
- "humidity stat" or "humidy stat" → "humidistat"

CLEANUP RULES:
- Remove filler words: um, uh, err, ah, like, you know, sort of, kind of, basically, right, so yeah
- Remove false starts, repeated words, and self-corrections
- Fix grammar and punctuation
- Structure into clear sentences in logical order
- Fix misrecognised construction terms using the glossary above
- Keep the EXACT same observations, descriptions, and professional judgments
- Keep the surveyor's own words and phrasing where possible
- Do NOT add any information that was not in the original
- Do NOT remove any observations or details
- Do NOT change the technical meaning of anything
- Do NOT add conclusions or recommendations the surveyor did not state
- Do NOT add greetings, sign-offs, or meta-commentary
- Output plain text only — no markdown, no bullet points, no headings
- Keep it concise — remove waffle but keep all substance
- British English spelling`

    // Load company profile for HTTP headers
    let companyWebsite = ''
    let companyName = 'Survey System'
    try {
      const profile = await getCompanyProfilePublic()
      companyWebsite = profile.website || ''
      companyName = profile.name
    } catch {
      // Use defaults if profile unavailable
    }

    const userPrompt = `Clean up this surveyor's voice note:\n\n${text}`

    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': companyWebsite || (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
          'X-Title': `${companyName} Survey System`,
        },
        body: JSON.stringify({
          model: 'x-ai/grok-4.1-fast',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.1,
          max_tokens: 1000,
          // grok-4.1-fast is a reasoning model; disable reasoning so thinking tokens
          // don't bleed into the content field and corrupt the polished output.
          reasoning: { enabled: false },
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

    const rawContent = data.choices[0].message.content
    if (!rawContent) {
      return NextResponse.json(
        { error: 'Model returned empty content' },
        { status: 500 }
      )
    }
    const polished = rawContent.trim()

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
