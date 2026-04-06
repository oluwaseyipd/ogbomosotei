import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { buildEmail } from '../_shared/emailTemplate.js'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const FROM_EMAIL = 'OTEI 2026 <no-reply@ogbomosotei.com>'
const CORS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' }

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })

  try {
    const { full_name, email, volunteer_areas, age_range, location } = await req.json()
    const firstName = full_name.split(' ')[0]

    const html = buildEmail({
      preheader: `We've received your volunteer application for OTEI 2026. Thank you for stepping up!`,
      headerTag: 'Application Received',
      title: 'Thank You for Volunteering!',
      recipientName: firstName,
      intro: `We've received your volunteer application for <strong>OTEI 2026</strong> and we're truly grateful you're willing to give your time to help make this event a success. Our team will review all applications and reach out to confirmed volunteers before <strong>April 25, 2026</strong>.`,
      sections: [
        {
          heading: 'Your Application Summary',
          items: [
            { label: 'Full Name', value: full_name },
            { label: 'Email', value: email },
            { label: 'Age Range', value: age_range || 'Not specified' },
            { label: 'Location', value: location || 'Not specified' },
            { label: 'Volunteer Areas', value: Array.isArray(volunteer_areas) ? volunteer_areas.join(', ') : volunteer_areas },
          ],
        },
        {
          heading: 'Event Details',
          items: [
            { label: 'Date', value: 'Saturday, May 2, 2026' },
            { label: 'Time', value: '10:00 AM (volunteers arrive earlier)' },
            { label: 'Venue', value: 'The Hall, LAUTECH, Ogbomoso' },
            { label: 'Pre-event Briefing', value: 'Date TBA — watch your email' },
          ],
        },
      ],
      nextSteps: [
        "Keep an eye on your email — we'll confirm your selection and role before <strong>April 25, 2026</strong>.",
        'Join our WhatsApp community to stay connected with the OTEI team and other volunteers.',
        "Once confirmed, you'll receive a separate briefing schedule with your specific responsibilities.",
        'Follow <strong>@ogbomosotei</strong> on Instagram and X for event updates.',
      ],
      ctaLabel: 'Visit ogbomosotei.com →',
      ctaUrl: 'https://ogbomosotei.com/volunteer',
      footerNote: 'Only shortlisted applicants will be contacted. Thank you for your interest in serving.',
    })

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM_EMAIL, to: email, subject: `Volunteer Application Received — OTEI 2026`, html }),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Resend error')

    return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json', ...CORS } })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json', ...CORS } })
  }
})