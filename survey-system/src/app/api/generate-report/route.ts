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
        const result = await generateSectionContent(
          apiKey,
          section.prompt,
          section.context,
          section.key
        )
        results.push({
          key: section.key,
          content: result.content,
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
  context: string,
  sectionKey: string
): Promise<{ content: string; finishReason: string }> {
  const systemPrompt = `You are a senior remedial surveyor at Tyne Tees Damp Proofing Ltd writing sections of a formal survey report. You hold the qualification A.Inst.SSE (Associate of the Institute of Specialist Surveyors and Engineers).

VOICE AND TONE:
- Write with authority and confidence. You are the expert.
- Use definitive language: "Our inspection revealed..." not "It appears that..."
- Third person throughout: "Our surveyor identified..." / "The inspection confirmed..."
- Match the formal but accessible tone of a professional UK property survey report
- Be concise and factual. Every sentence must convey useful information.

DATA INTERPRETATION RULES — CRITICAL:
- Wall measurements (length × height) represent the AFFECTED AREA requiring treatment, NOT the full wall dimensions
- If a measurement shows 3m × 2m, report it as: "An area measuring approximately 3 metres in length by 2 metres in height was identified as requiring treatment"
- NEVER state that data is missing, incomplete, or contains errors. If a field has no value, simply omit it from the narrative.
- NEVER question or contradict the survey data. Present all measurements and findings as factual observations.
- NEVER use phrases like "was recorded as 0" or "suggests an error" or "was not specified" or "was not recorded"
- If area is 0 or missing, calculate it yourself from length × height, or simply omit the area figure

FABRICATION PREVENTION — CRITICAL:
- ONLY reference measurements, readings, and findings that are explicitly provided in the SURVEY DATA CONTEXT below
- If moisture readings are not provided in the context, DO NOT mention moisture readings at all — not even to say they "confirmed" dampness
- If plaster condition is not mentioned in the context, DO NOT comment on plaster condition
- If a data point is absent from the context, it does not exist — do not infer, assume, or fabricate it
- Every factual claim in your text must trace directly to a specific data point in the context provided

TREATMENT REFERENCES:
- When treatment type is "membrane", write: "installation of a cavity drain membrane system"
- When treatment type is "injection", write: "injection of a chemical damp proof course"
- When treatment type is "tanking", write: "application of a cementitious tanking system"
- Always state the specific treatment — never suggest the customer "consider" options. The surveyor has already determined what is needed.

ROOM FINDINGS STRUCTURE:
- Paragraph 1: Describe what was found — which wall(s), the treatment area measurements, and any recorded readings
- Paragraph 2: State the recommended treatment clearly: "We recommend [specific treatment] to the affected area"
- Do not add a third paragraph
- Do not suggest further inspection or additional investigation — the survey is complete and the treatment has been determined

SURVEYOR COMMENTS STRUCTURE:
- Paragraph 1: Overall summary of findings across all rooms
- Paragraph 2: The recommended works programme and any external defects that should be addressed
- Paragraph 3 (optional): Any practical advice relevant to the specific property
- Do not recommend the homeowner consult other specialists — this company provides the full service

STRUCTURAL RULES:
- Maximum 2 paragraphs per room finding section
- Maximum 3 paragraphs for surveyor comments
- No bullet points — prose only
- No headings or sub-headings within your text
- No markdown formatting whatsoever
- Do not repeat the room name if it's already in the section heading
- Do not repeat information that appears in other sections of the report (e.g., don't restate building defects in room findings)

FORBIDDEN PHRASES — never use any of these:
- "Further inspection would be necessary"
- "The exact nature/extent was not specified/determined"
- "It is likely that" / "It may be" / "It appears that"
- "Consideration should be given to"
- "The homeowner is advised to consult"
- "suggests an error"
- "was not recorded" / "was not noted" / "was not explicitly"
- "no specific readings were recorded"
- "the correct calculation would yield"
- Any reference to data quality, completeness, or accuracy`

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
        temperature: 0.2, // Maximum precision and consistency, minimal creativity
        max_tokens: 3000, // Increased to prevent truncation of long sections
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

  const finishReason = data.choices[0].finish_reason
  let content = data.choices[0].message.content.trim()

  // Log response details for debugging
  console.log(`Section ${sectionKey}: ${content.length} chars, finish_reason: ${finishReason}`)

  // Check if response was truncated
  if (finishReason === 'length') {
    console.warn(`LLM response was truncated for section ${sectionKey} due to max_tokens limit`)
  }

  // If content ends mid-sentence (no punctuation), append ellipsis
  if (content.length > 0 && !/[.!?]$/.test(content)) {
    console.warn('LLM response appears to end mid-sentence, appending ellipsis')
    content += '...'
  }

  // Validate content (basic sanity check)
  if (content.length < 50) {
    throw new Error('Generated content too short')
  }

  return { content, finishReason }
}
