const ORANGE = '#F97316'
const BLACK = '#111111'
const WHATSAPP_URL = 'https://chat.whatsapp.com/IV3NhSWZ1zTA3kXw5Q5JEy'
const CALENDAR_URL = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=OTEI+2026&dates=20260502T090000Z/20260502T170000Z&details=Ogbomoso+Tech+%26+Entrepreneurship+Ignite&location=The+Hall%2C+LAUTECH%2C+Ogbomoso'

export function buildEmail(opts) {
  const sectionsHtml = opts.sections.map(s => `
    <div style="margin-bottom:24px;">
      <p style="font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${ORANGE};margin:0 0 10px 0;">${s.heading}</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        ${s.items.map(item => `
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#888888;width:40%;border-bottom:1px solid #f0f0f0;">${item.label}</td>
            <td style="padding:8px 0;font-size:13px;color:${BLACK};font-weight:500;border-bottom:1px solid #f0f0f0;">${item.value}</td>
          </tr>
        `).join('')}
      </table>
    </div>
  `).join('')

  const nextStepsHtml = opts.nextSteps.map((step, i) => `
    <tr>
      <td style="padding:6px 0;vertical-align:top;width:30px;">
        <span style="display:inline-block;width:20px;height:20px;background:${ORANGE};color:#fff;font-size:11px;font-weight:700;text-align:center;line-height:20px;">${i + 1}</span>
      </td>
      <td style="padding:6px 0 6px 10px;font-size:13px;color:#555555;line-height:1.6;">${step}</td>
    </tr>
  `).join('')

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${opts.title}</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:Arial,sans-serif;">

  <div style="display:none;max-height:0;overflow:hidden;">${opts.preheader}</div>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;" cellpadding="0" cellspacing="0">

        <!-- Header -->
        <tr><td style="background:${BLACK};padding:28px 32px 24px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <p style="margin:0;font-size:14px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#ffffff;">OTEI 2026</p>
                <p style="margin:2px 0 0;font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:${ORANGE};font-weight:600;">Ogbomoso Tech &amp; Entrepreneurship Ignite</p>
              </td>
              <td align="right">
                <span style="display:inline-block;background:${ORANGE};color:#fff;font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:5px 12px;">${opts.headerTag}</span>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Orange accent bar -->
        <tr><td style="background:${ORANGE};height:3px;font-size:0;line-height:0;">&nbsp;</td></tr>

        <!-- Body -->
        <tr><td style="background:#ffffff;padding:36px 32px 28px;">
          <h1 style="margin:0 0 6px;font-size:24px;font-weight:700;color:${BLACK};line-height:1.2;">${opts.title}</h1>
          <p style="margin:0 0 24px;font-size:13px;color:#888;font-style:italic;">Hi ${opts.recipientName},</p>
          <p style="margin:0 0 28px;font-size:14px;color:#444444;line-height:1.7;">${opts.intro}</p>

          ${sectionsHtml}

          <!-- Next Steps -->
          <div style="background:#fafafa;border-left:3px solid ${ORANGE};padding:20px 24px;margin-bottom:28px;">
            <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${ORANGE};">What's Next</p>
            <table cellpadding="0" cellspacing="0">
              ${nextStepsHtml}
            </table>
          </div>

          <!-- Primary CTA -->
          <table cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
            <tr>
              <td style="background:${ORANGE};">
                <a href="${opts.ctaUrl}" style="display:inline-block;padding:14px 32px;font-size:13px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:.04em;">${opts.ctaLabel}</a>
              </td>
            </tr>
          </table>

          <!-- Add to Calendar -->
          <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr>
              <td style="border:1.5px solid #e5e5e5;">
                <a href="${CALENDAR_URL}" style="display:inline-block;padding:12px 28px;font-size:12px;font-weight:600;color:${BLACK};text-decoration:none;letter-spacing:.04em;">+ Add to Google Calendar</a>
              </td>
            </tr>
          </table>

          <!-- WhatsApp CTA -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf4;border:1px solid #dcfce7;margin-bottom:4px;">
            <tr>
              <td style="padding:16px 20px;">
                <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#166534;">Join the WhatsApp Community</p>
                <p style="margin:0 0 10px;font-size:12px;color:#4b7a5a;line-height:1.5;">Stay updated with event news and connect with other attendees before May 2.</p>
                <a href="${WHATSAPP_URL}" style="font-size:12px;font-weight:700;color:#16a34a;text-decoration:none;">Click here to join the group &rarr;</a>
              </td>
            </tr>
          </table>

        </td></tr>

        <!-- Event Details Band -->
        <tr><td style="background:#1a1a1a;padding:20px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-right:16px;">
                <p style="margin:0 0 2px;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:#666;">Date</p>
                <p style="margin:0;font-size:12px;font-weight:600;color:#fff;">May 2, 2026</p>
              </td>
              <td style="padding-right:16px;">
                <p style="margin:0 0 2px;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:#666;">Time</p>
                <p style="margin:0;font-size:12px;font-weight:600;color:#fff;">10:00 AM</p>
              </td>
              <td>
                <p style="margin:0 0 2px;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:#666;">Venue</p>
                <p style="margin:0;font-size:12px;font-weight:600;color:#fff;">The Hall, LAUTECH, Ogbomoso</p>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:${BLACK};padding:20px 32px;text-align:center;">
          <p style="margin:0 0 6px;font-size:11px;color:#555555;">
            <a href="https://ogbomosotei.com" style="color:${ORANGE};text-decoration:none;">ogbomosotei.com</a>
            &nbsp;&middot;&nbsp;
            <a href="https://x.com/ogbomosotei" style="color:#555;text-decoration:none;">@ogbomosotei</a>
          </p>
          ${opts.footerNote ? `<p style="margin:6px 0 0;font-size:11px;color:#444444;">${opts.footerNote}</p>` : ''}
          <p style="margin:8px 0 0;font-size:10px;color:#333333;">© 2026 Ogbomoso Tech &amp; Entrepreneurship Ignite. All rights reserved.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`.trim()
}