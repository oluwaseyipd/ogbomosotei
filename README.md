# OTEI 2026 — Ogbomoso Tech & Entrepreneurship Ignite
**Website:** ogbomosotei.com  
**Stack:** React + Vite + Tailwind CSS + Supabase

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
```
Fill in your Supabase URL and anon key from your Supabase project settings.

### 3. Set up Supabase database
- Go to your Supabase project → SQL Editor
- Copy the entire SQL block from `src/lib/supabase.js` (between the `===` lines)
- Run it to create all 4 tables with RLS policies

### 4. Run the dev server
```bash
npm run dev
```

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx         # Sticky responsive navbar
│   ├── Footer.jsx         # Footer with social links
│   └── AdminGuard.jsx     # Password-protected route wrapper
├── hooks/
│   └── useCountdown.js    # Live countdown to May 2, 2026
├── lib/
│   └── supabase.js        # Supabase client + SQL schema
├── pages/
│   ├── Home.jsx           # Full homepage (hero, about, schedule, speakers, sponsors)
│   ├── Register.jsx       # Event registration form
│   ├── Volunteer.jsx      # Volunteer application form
│   ├── Sponsor.jsx        # Sponsor application form
│   ├── Exhibition.jsx     # Exhibitor registration form
│   └── Admin.jsx          # Password-protected dashboard
├── App.jsx                # Routing setup
├── main.jsx               # Entry point
└── index.css              # Tailwind + custom animations
```

---

## Pages

| Route | Page |
|---|---|
| `/` | Homepage |
| `/register` | Event Registration |
| `/volunteer` | Volunteer Application |
| `/sponsor` | Sponsor Application |
| `/exhibition` | Exhibition Booth Registration |
| `/admin` | Admin Dashboard (password-protected) |

---

## Admin Dashboard

Navigate to `/admin` and enter the password set in `VITE_ADMIN_PASSWORD`.

**Features:**
- Summary stats for all 4 form types
- Bar charts and pie charts per category
- Search and filter on every table
- CSV export for every dataset
- Refresh button to pull latest data
- Logout button

**Security note:** The password is stored in the env variable and checked client-side via `sessionStorage`. For production, consider replacing this with Supabase Auth (email/password login) for stronger security.

---

## Supabase Tables

| Table | Description |
|---|---|
| `registrations` | Event attendee registrations |
| `volunteers` | Volunteer applications |
| `sponsors` | Sponsor applications |
| `exhibitors` | Exhibition booth registrations |

All tables use Row Level Security:
- **Anon users** can INSERT (submit forms)
- **Authenticated users** can SELECT (admin reads)

---

## Deployment

### Vercel (recommended)
```bash
npm install -g vercel
vercel --prod
```
Add your `.env.local` variables in the Vercel dashboard under Project → Settings → Environment Variables.

### Netlify
```bash
npm run build
# drag & drop the dist/ folder to Netlify
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key |
| `VITE_ADMIN_PASSWORD` | Password for `/admin` route |

---

## Brand

- **Primary:** `#F97316` (Orange)
- **Dark:** `#111111` (Black)
- **Accent:** `#FBBF24` (Yellow)
- **Font Display:** Playfair Display (serif)
- **Font Body:** DM Sans (sans-serif)

---

## Social Links

- X: https://x.com/ogbomosotei
- Instagram: https://www.instagram.com/ogbomosotei
- Facebook: https://www.facebook.com/profile.php?id=61575743913917
- WhatsApp: https://chat.whatsapp.com/IV3NhSWZ1zTA3kXw5Q5JEy
