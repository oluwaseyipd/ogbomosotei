import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { buildEmail } from '../_shared/emailTemplate.js'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const FROM_EMAIL = 'OTEI 2026 <no-reply@ogbomosotei.com>'
const CORS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' }

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })

  try {
    const { contact_name, email, business_name, industry, exhibition_package, power_internet } = await req.json()
    const firstName = contact_name.split(' ')[0]

    const html = buildEmail({
      preheader: `Your exhibition booth registration for OTEI 2026 has been received. Booth assignment details coming soon.`,
      headerTag: 'Booth Registration',
      title: 'Exhibition Registration Received!',
      recipientName: firstName,
      intro: `Thank you for registering <strong>${business_name}</strong> to exhibit at <strong>OTEI 2026</strong>. We're thrilled to have your business showcased at Ogbomoso's premier tech and entrepreneurship event. Our team will review your registration and send booth assignment details closer to the event.`,
      sections: [
        {
          heading: 'Your Exhibition Details',
          items: [
            { label: 'Business Name', value: business_name },
            { label: 'Industry', value: industry || 'Not specified' },
            { label: 'Contact Person', value: contact_name },
            { label: 'Email', value: email },
            { label: 'Package', value: exhibition_package || 'Not specified' },
            { label: 'Power / Internet', value: power_internet ? 'Required' : 'Not required' },
          ],
        },
        {
          heading: 'Event Details',
          items: [
            { label: 'Date', value: 'Saturday, May 2, 2026' },
            { label: 'Setup Time', value: 'From 7:00 AM (TBC)' },
            { label: 'Event Opens', value: '10:00 AM' },
            { label: 'Venue', value: 'The Hall, LAUTECH, Ogbomoso' },
            { label: 'Expected Footfall', value: '1,000+ attendees' },
          ],
        },
      ],
      nextSteps: [
        'Our team will send your <strong>booth assignment and setup instructions</strong> at least 7 days before the event.',
        'Prepare your display materials, banners, and product samples for the booth.',
        'Join our WhatsApp community to stay in sync with the organising team.',
        'For questions about your booth, email <a href="mailto:info@ogbomosotei.com" style="color:#F97316;">info@ogbomosotei.com</a>.',
      ],
      ctaLabel: 'View Exhibition Details →',
      ctaUrl: 'https://ogbomosotei.com/exhibition',
      footerNote: 'This is an automated confirmation. Booth assignments are subject to availability and review.',
    })

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM_EMAIL, to: email, subject: `Exhibition Booth Registration Confirmed — OTEI 2026`, html }),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Resend error')

    return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json', ...CORS } })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json', ...CORS } })
  }
})