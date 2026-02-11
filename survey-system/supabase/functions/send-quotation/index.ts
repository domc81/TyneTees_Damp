// Edge Function: Send Quotation Email
// Supabase Edge Function for sending quotation emails to customers

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface RequestBody {
  projectId: string
  recipientEmail: string
  message: string
  quotationNumber: string
}

serve(async (req: Request) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } })
  }

  try {
    const { projectId, recipientEmail, message, quotationNumber }: RequestBody = await req.json()

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Generate PDF (in production, this would generate the actual PDF)
    const pdfUrl = await generateQuotationPDF(supabase, projectId)

    // Send email via your email provider (Resend, SendGrid, etc.)
    const emailSent = await sendEmail({
      to: recipientEmail,
      subject: `Quotation ${quotationNumber} - Tyne Tees Damp Proofing`,
      htmlContent: generateEmailHTML(message, quotationNumber, pdfUrl),
      attachments: [{ filename: `quotation-${quotationNumber}.pdf`, url: pdfUrl }],
    })

    if (!emailSent) {
      throw new Error('Failed to send email')
    }

    // Update quotation record
    await supabase
      .from('quotations')
      .update({ status: 'sent', sent_at: new Date().toISOString() })
      .eq('project_id', projectId)

    return new Response(
      JSON.stringify({ success: true, message: 'Quotation sent successfully' }),
      {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      }
    )
  }
})

// Generate PDF URL (placeholder - would use PDF generation service in production)
async function generateQuotationPDF(supabase: any, projectId: string): Promise<string> {
  // In production:
  // 1. Fetch project data from Supabase
  // 2. Use Puppeteer/Playwright or a PDF service to generate
  // 3. Upload to Supabase Storage
  // 4. Return signed URL
  return `https://storage.supabase.co/projects/${projectId}/quotations/generated.pdf`
}

// Send email (placeholder - integrate with email provider)
async function sendEmail({
  to,
  subject,
  htmlContent,
  attachments,
}: {
  to: string
  subject: string
  htmlContent: string
  attachments: Array<{ filename: string; url: string }>
}): Promise<boolean> {
  // In production, integrate with Resend, SendGrid, AWS SES, etc.
  // Example with Resend:
  /*
  const resend = new Resend(Deno.env.get('RESEND_API_KEY'))
  const response = await resend.emails.send({
    from: 'Tyne Tees Damp Proofing <quotes@tyneteesdamp.co.uk>',
    to,
    subject,
    html: htmlContent,
    attachments: attachments.map(a => ({ filename: a.filename, path: a.url })),
  })
  return response.error === null
  */
  console.log(`Email would be sent to ${to}: ${subject}`)
  return true
}

// Generate email HTML template
function generateEmailHTML(message: string, quotationNumber: string, pdfUrl: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f4f4f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #006fc7 0%, #0058a1 100%); padding: 40px; border-radius: 12px 12px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 28px;">TYNE TEES</h1>
      <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0 0;">Damp Proofing Specialists</p>
    </div>

    <!-- Content -->
    <div style="background: white; padding: 40px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <p style="color: #18181b; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
        ${message.replace(/\n/g, '<br>')}
      </p>

      <!-- Quotation Details -->
      <div style="background: #f4f4f5; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
        <p style="margin: 0 0 8px 0; color: #71717a; font-size: 14px;">Quotation Reference</p>
        <p style="margin: 0; color: #18181b; font-size: 20px; font-weight: bold;">${quotationNumber}</p>
      </div>

      <!-- CTA Button -->
      <a href="${pdfUrl}"
         style="display: inline-block; background: #0c8ce9; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; margin-bottom: 24px;">
        View Full Quotation
      </a>

      <p style="color: #71717a; font-size: 14px; line-height: 1.6;">
        This quotation is valid for 30 days from the date of this email.
        If you have any questions, please don't hesitate to contact us.
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding: 24px; color: #71717a; font-size: 12px;">
      <p style="margin: 0;">Tyne Tees Damp Proofing | Registered in England & Wales</p>
      <p style="margin: 8px 0 0 0;">All works carry a 20-year guarantee</p>
    </div>
  </div>
</body>
</html>
  `
}
