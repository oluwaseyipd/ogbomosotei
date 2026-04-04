import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { buildEmail } from '../_shared/emailTemplate.js'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const FROM_EMAIL = 'OTEI 2026 <no-reply@ogbomosotei.com>'
const CORS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' }

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })

  try {
    const { contact_name, email, org_name, sponsorship_tier, interest_areas } = await req.json()
    const firstName = contact_name.split(' ')[0]

    const html = buildEmail({
      preheader: `Thank you for your interest in sponsoring OTEI 2026. Our team will be in touch within 2–3 business days.`,
      headerTag: 'Sponsorship Application',
      title: 'Application Received — Thank You!',
      recipientName: firstName,
      intro: `Thank you for expressing interest in sponsoring <strong>Ogbomoso Tech &amp; Entrepreneurship Ignite 2026</strong>. We're excited about the possibility of partnering with <strong>${org_name}</strong>. A member of our partnerships team will review your application and reach out within <strong>2–3 business days</strong>.`,
      sections: [
        {
          heading: 'Your Application Summary',
          items: [
            { label: 'Organisation', value: org_name },
            { label: 'Contact Name', value: contact_name },
            { label: 'Email', value: email },
            { label: 'Selected Tier', value: sponsorship_tier || 'Not specified' },
            { label: 'Areas of Interest', value: Array.isArray(interest_areas) ? interest_areas.join(', ') : 'Not specified' },
          ],
        },
        {
          heading: 'What Your Sponsorship Supports',
          items: [
            { label: 'Reach', value: '1,000+ students, founders & professionals' },
            { label: 'Pillars', value: 'Tech, Entrepreneurship, Tax, Compliance' },
            { label: 'Format', value: 'Keynotes, panels, workshops, startup pitches' },
            { label: 'Date', value: 'Saturday, May 2, 2026' },
            { label: 'Venue', value: 'The Hall, LAUTECH, Ogbomoso' },
          ],
        },
      ],
      nextSteps: [
        `Our partnerships team will contact you at <strong>${email}</strong> within 2–3 business days.`,
        "You'll receive a detailed sponsorship package outlining all benefits for your selected tier.",
        "Once confirmed, we'll begin brand integration across all event materials and promotions.",
        'For urgent inquiries, email us at <a href="mailto:info@ogbomosotei.com" style="color:#F97316;">info@ogbomosotei.com</a>.',
      ],
      ctaLabel: 'Learn More About OTEI 2026 →',
      ctaUrl: 'https://ogbomosotei.com/sponsor',
      footerNote: 'This is an automated confirmation. A member of our team will reach out personally.',
    })

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM_EMAIL, to: email, subject: `Sponsorship Application Received — OTEI 2026`, html }),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Resend error')

    return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json', ...CORS } })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json', ...CORS } })
  }
})