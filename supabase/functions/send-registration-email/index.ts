import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { buildEmail } from '../_shared/emailTemplate.js'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const FROM_EMAIL = 'OTEI 2026 <no-reply@ogbomosotei.com>'
const CORS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' }

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })

  try {
    const { first_name, last_name, email, participant_category, interest_areas, city_state } = await req.json()

    const html = buildEmail({
      preheader: `You're registered for OTEI 2026! See you on May 2 at LAUTECH, Ogbomoso.`,
      headerTag: 'Registration Confirmed',
      title: "You're In!",
      recipientName: first_name,
      intro: `Your registration for <strong>Ogbomoso Tech &amp; Entrepreneurship Ignite 2026</strong> has been confirmed. We're excited to have you join us for what promises to be a transformative day of technology, entrepreneurship, and real-world insights.`,
      sections: [
        {
          heading: 'Your Registration Details',
          items: [
            { label: 'Full Name', value: `${first_name} ${last_name}` },
            { label: 'Email', value: email },
            { label: 'Location', value: city_state || 'Not specified' },
            { label: 'Registered As', value: Array.isArray(participant_category) ? participant_category.join(', ') : participant_category },
            { label: 'Interest Areas', value: Array.isArray(interest_areas) ? interest_areas.join(', ') : 'Not specified' },
          ],
        },
        {
          heading: 'Event Details',
          items: [
            { label: 'Date', value: 'Saturday, May 2, 2026' },
            { label: 'Time', value: '10:00 AM (doors open)' },
            { label: 'Venue', value: 'The Hall, LAUTECH, Ogbomoso' },
            { label: 'Dress Code', value: 'Smart Casual' },
            { label: 'Entry', value: 'Free — present this email at the door' },
          ],
        },
      ],
      nextSteps: [
        'Save the date — May 2, 2026 — to your calendar using the button below.',
        'Join our WhatsApp community to stay updated with speaker reveals and announcements.',
        'Arrive at least 15 minutes early to complete check-in and get settled.',
        'Follow <strong>@ogbomosotei</strong> on Instagram and X for the latest updates.',
      ],
      ctaLabel: 'View Event Details →',
      ctaUrl: 'https://ogbomosotei.com',
      footerNote: 'Your information is kept confidential and used only for event communication and planning.',
    })

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM_EMAIL, to: email, subject: `You're registered for OTEI 2026 — See you May 2!`, html }),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Resend error')

    return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json', ...CORS } })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json', ...CORS } })
  }
})