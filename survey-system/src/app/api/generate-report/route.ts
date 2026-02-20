// =============================================================================
// Report Generation API Route — LLM Narrative Generation via OpenRouter
// Generates professional survey narrative sections using Llama 3.1 70B
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'

interface SectionRequest {
  key: string
  prompt: string
  context: string
}

interface GenerateReportRequest {
  surveyId: string
  sections: SectionRequest[]
}

interface GeneratedSection {
  key: string
  content: string
  error?: string
}

/**
 * POST /api/generate-report
 * Batch generates narrative content for multiple report sections
 */
export async function POST(request: NextRequest) {
  try {
    const body: GenerateReportRequest = await request.json()
    const { surveyId, sections } = body

    if (!surveyId || !sections || sections.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: surveyId and sections' },
        { status: 400 }
      )
    }

    // Check for OpenRouter API key
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY not configured')
      return NextResponse.json(
        { error: 'LLM service not configured' },
        { status: 500 }
      )
    }

    // Generate content for each section
    const results: GeneratedSection[] = []

    for (const section of sections) {
      try {
        const content = await generateSectionContent(
          apiKey,
          section.prompt,
          section.context
        )
        results.push({
          key: section.key,
          content,
        })
      } catch (error) {
        console.error(`Error generating section ${section.key}:`, error)
        results.push({
          key: section.key,
          content: '',
          error:
            'Failed to generate content. Please write this section manually.',
        })
      }
    }

    return NextResponse.json({
      surveyId,
      sections: results,
    })
  } catch (error) {
    console.error('Error in /api/generate-report:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Generate content for a single section using OpenRouter
 */
async function generateSectionContent(
  apiKey: string,
  sectionPrompt: string,
  context: string
): Promise<string> {
  const systemPrompt = `You are an expert damp, timber, condensation, and woodworm surveyor writing a formal professional survey report for a UK property inspection company (Tyne Tees Damp Proofing).

Your writing style must be:
- Third person perspective ("Our surveyor noted..." NOT "I noted...")
- Professional and technical but accessible to homeowners
- Clear and concise (2-4 paragraphs per section maximum)
- Reference specific measurements and findings from the survey data
- Use British English spelling and terminology
- Use surveying industry standard terms (DPC, DPM, W/W moisture content, etc.)
- Match the formal tone of existing survey reports

CRITICAL RULES FOR SPECIFICITY:
- ALWAYS reference specific room names when discussing findings (e.g., "In the Living Room..." NOT "In the inspected room...")
- ALWAYS include specific measurements when available (e.g., "Left wall: 3m × 2m = 6m²" NOT "the wall was damp")
- ALWAYS mention specific treatment recommendations (e.g., "membrane system" or "chemical DPC injection")
- ALWAYS reference moisture readings if provided (e.g., "readings of 18%, 22%, and 25%")
- ALWAYS specify which external defects were noted (e.g., "cracked rendering and damaged pointing")
- For summary sections, include total affected area and number of rooms
- Do NOT write generic advice — every statement must relate to specific findings from THIS particular survey

CRITICAL RULES:
- NEVER invent findings that aren't in the survey data
- NEVER contradict the survey measurements or observations
- ONLY reference data explicitly provided in the context
- If insufficient data is provided, state "Further inspection required"
- Keep each section focused and on-topic
- Do NOT repeat information across sections
- Do NOT add disclaimers or caveats unless specifically relevant
- Write in complete, grammatically correct sentences

You are generating ONE section of a multi-section report. Stay focused on the specific topic requested.`

  const userPrompt = `${sectionPrompt}

SURVEY DATA CONTEXT:
${context}

Generate the narrative content for this section now. Output ONLY the report text, no meta-commentary, no markdown formatting, just the plain professional report text.`

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
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        temperature: 0.7, // Balanced creativity and consistency
        max_tokens: 1000, // ~2-4 paragraphs
        top_p: 0.9,
      }),
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    console.error('OpenRouter API error:', errorText)
    throw new Error(`OpenRouter API error: ${response.status}`)
  }

  const data = await response.json()

  if (!data.choices || data.choices.length === 0) {
    throw new Error('No content generated by LLM')
  }

  const content = data.choices[0].message.content.trim()

  // Validate content (basic sanity check)
  if (content.length < 50) {
    throw new Error('Generated content too short')
  }

  return content
}
