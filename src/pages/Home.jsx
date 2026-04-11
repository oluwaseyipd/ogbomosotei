import { Link } from 'react-router-dom'
import { useCountdown } from '../hooks/useCountdown'
import { FaWhatsapp } from 'react-icons/fa6'
import { HiArrowRight } from 'react-icons/hi'
import { SpeakerSection } from '../components/Speakers'
import HeroSection from '../components/HeroSection'

// Sponsor logos
import sponsor1 from '../assets/sponsors/fxlogistics.png'
import sponsor2 from '../assets/sponsors/vehauction.png'
import sponsor3 from '../assets/sponsors/frillconstructions.png'
import sponsor4 from '../assets/sponsors/naijaridesauto.png'
import sponsor5 from '../assets/sponsors/creatorgigs.png'
import sponsor6 from '../assets/sponsors/nrs.png'



// ─── Ticker ────────────────────────────────────────────────────────
const PILLARS = [
  'Technology & Digital Innovation',
  'Entrepreneurship & Business Growth',
  'Startup Funding & Investment Readiness',
  'Tax Education & Compliance',
  'Youth Empowerment',
  'CAC Registration & Governance',
  'Business Compliance & Legal Structure',
  'Career Development',
]

function Ticker() {
  const items = [...PILLARS, ...PILLARS]
  return (
    <div className="bg-brand-orange py-3 overflow-hidden">
      <div className="flex ticker-animate whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-8 text-[11px] font-semibold tracking-widest uppercase text-white">
            {item}
            <span className="text-orange-300 opacity-60">—</span>
          </span>
        ))}
      </div>
    </div>
  )
}


// ─── Sponsors Scroll ───────────────────────────────────────────────

// sponsor logos

const SPONSORS = [sponsor1, sponsor2, sponsor3, sponsor4, sponsor5, sponsor6]

function SponsorsSection() {
  // Repeat sponsors multiple times for continuous scrolling
  const scrollingSponsors = [...SPONSORS, ...SPONSORS, ...SPONSORS]
  return (
    <section id="sponsors" className="border-t border-b border-gray-100 py-16 overflow-hidden">
      <div className="text-center px-5 mb-10">
        <span className="section-tag">Partners & Sponsors</span>
        <h2 className="section-title">Our Sponsors</h2>
        <p className="text-sm text-gray-400 mt-2">Sponsorship spots available — be part of the movement</p>
      </div>

      {/* Infinite scroll logos */}
<div className="overflow-hidden mb-16">
  <div className="flex sponsor-animate gap-20 w-max">
    {scrollingSponsors.map((sponsor, i) => (
      <div key={i} className="min-w-[200px] h-28 flex items-center justify-center flex-shrink-0 bg-white">
        <img 
          src={sponsor} 
          alt={`Sponsor ${i + 1}`} 
          className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all"
        />
      </div>
    ))}
  </div>
</div>


      {/* CTA - Become A Sponsor */}
      <div className='max-w-5xl mx-auto px-5 md:px-10'>
        <div className="bg-brand-black text-white p-10 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div>
            <div className="text-[15px] text-brand-orange tracking-widest uppercase font-medium mb-2">Partner with Us</div>
            <div className="text-2xl md:text-4xl  font-serif font-bold mb-1">Become a Sponsor</div>
            <p className="text-sm text-white/90 leading-relaxed max-w-md">
              Align your brand with innovation, entrepreneurship, and community impact in Ogbomoso. Sponsorship opportunities available at multiple levels.
            </p>
          </div>
          <div className="btn-primary flex items-center gap-2 py-3 px-6 cursor-pointer"> 
            <a href="/sponsor" className='flex items-center gap-4'> 
            <span>View Sponsorship Packages</span> 
             <HiArrowRight size={16} />
             </a>
          </div>
          

        </div>
      </div>

      {/* Tiers */}
      {/* <div className="max-w-5xl mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-0.5">
        {TIERS.map(t => (
          <div key={t.name} className={`p-6 border ${t.featured ? 'bg-brand-black border-brand-black' : 'bg-white border-gray-100'}`}>
            <div className={`text-[9px] tracking-widest uppercase font-semibold mb-2 ${t.featured ? 'text-brand-orange' : 'text-gray-400'}`}>
              {t.name}
            </div>
            <div className={`font-serif text-2xl font-bold mb-1 ${t.featured ? 'text-white' : 'text-brand-black'}`}>
              {t.price}
            </div>
            <p className={`text-xs leading-relaxed mb-4 ${t.featured ? 'text-gray-500' : 'text-gray-400'}`}>{t.desc}</p>
            <Link to="/sponsor" className={`text-[11px] font-semibold tracking-wide uppercase block text-center py-2 transition-colors ${
              t.featured
                ? 'bg-brand-orange text-white hover:bg-orange-600'
                : 'border border-gray-200 text-gray-500 hover:border-brand-black hover:text-brand-black'
            }`}>
              Apply Now
            </Link>
          </div>
        ))}
      </div> */}
    </section>
  )
}

// ─── Schedule ──────────────────────────────────────────────────────
const SCHEDULE = [
  { time: '10:00 AM', title: 'Welcome & Opening Ceremony', desc: 'Official commencement, national anthem, and introductions.', tag: 'Plenary', featured: false },
  { time: '11:00 AM', title: 'Keynote: Vision to Value', desc: 'The central keynote address setting the tone for the day.', tag: 'Featured', featured: true },
  { time: 'Afternoon', title: 'Panel Discussions & Workshops', desc: 'Parallel sessions on tech, tax, compliance, and more. Full agenda TBA.', tag: 'Workshops', featured: false },
  { time: 'Afternoon', title: 'Startup Pitch Arena', desc: 'Selected founders pitch to investors and industry experts.', tag: 'Startup Stage', featured: false },
  { time: 'Evening', title: 'Networking & Closing', desc: 'Connect with speakers, partners, and fellow participants.', tag: 'Networking', featured: false },
]

function ScheduleSection() {
  return (
    <section id="schedule" className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <span className="section-tag">Programme</span>
            <h2 className="section-title">Event Schedule</h2>
          </div>
          <p className="text-xs text-gray-400 max-w-xs md:text-right leading-relaxed">
            Full agenda will be published closer to the event date, May 2, 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
          {SCHEDULE.slice(0, 3).map((s, i) => (
            <div key={i} className={`p-7 border ${s.featured ? 'bg-brand-black border-brand-black' : 'bg-white border-gray-100'}`}>
              <div className={`text-[10px] font-medium tracking-widest uppercase mb-3 ${s.featured ? 'text-brand-orange' : 'text-gray-400'}`}>{s.time}</div>
              <h3 className={`text-base font-semibold mb-2 leading-snug ${s.featured ? 'text-white' : 'text-brand-black'}`}>{s.title}</h3>
              <p className={`text-xs leading-relaxed ${s.featured ? 'text-gray-500' : 'text-gray-400'}`}>{s.desc}</p>
              <span className={`inline-block mt-4 text-[9px] tracking-widest uppercase px-2 py-1 font-semibold ${s.featured ? 'bg-brand-orange text-white' : 'bg-orange-50 text-brand-orange'}`}>
                {s.tag}
              </span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 mt-0.5">
          {SCHEDULE.slice(3).map((s, i) => (
            <div key={i} className="p-7 bg-white border border-gray-100">
              <div className="text-[10px] font-medium tracking-widest uppercase text-gray-400 mb-3">{s.time}</div>
              <h3 className="text-base font-semibold text-brand-black mb-2 leading-snug">{s.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
              <span className="inline-block mt-4 text-[9px] tracking-widest uppercase px-2 py-1 font-semibold bg-orange-50 text-brand-orange">{s.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Main Home Component ───────────────────────────────────────────
export default function Home() {

  return (
    <div className='relative'>
      {/* Floating WhatsApp Button */}
      <a href="https://chat.whatsapp.com/IV3NhSWZ1zTA3kXw5Q5JEy" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-200 z-50">
        <FaWhatsapp size={24} />
      </a>

      {/* TICKER */}
      <HeroSection />
      <Ticker />

      {/* ABOUT */}
      <section id="about" className="py-20 px-5 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <span className="section-tag">About OTEI</span>
            <h2 className="section-title mb-6">Where Ideas Meet Structure &amp; Opportunity</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              Ogbomoso Tech &amp; Entrepreneurship Ignite is a flagship innovation and business empowerment event created to spark a new wave of technology adoption, entrepreneurial thinking, tax awareness, and regulatory compliance among students, youths, founders, professionals, and small businesses in Ogbomoso.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">
              Designed as a high-impact, practical gathering that goes beyond motivation — focusing on real-world skills, responsible business practices, and sustainable growth.
            </p>

            <div className="grid grid-cols-2 gap-0.5">
              {[
                { num: '01', label: 'Technology', desc: 'Digital education & skill development' },
                { num: '02', label: 'Startups', desc: 'Launchpad for entrepreneurs & SMEs' },
                { num: '03', label: 'Tax & Compliance', desc: 'FIRS, VAT, CAC education' },
                { num: '04', label: 'Growth', desc: 'Local talent, global opportunities' },
              ].map(p => (
                <div key={p.num} className="bg-gray-50 border border-gray-100 p-5">
                  <div className="text-[10px] font-bold text-brand-orange tracking-widest mb-2">{p.num} — {p.label.toUpperCase()}</div>
                  <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-0.5">
            {[
              { num: '1K+', desc: 'Expected attendees — students, founders, professionals, and SME operators' },
              { num: '6+', desc: 'Key session pillars covering technology, business, tax, compliance, and more' },
              { num: '1 Day', desc: 'High-impact, focused experience — May 2, 2026 at The Hall, LAUTECH' },
            ].map(s => (
              <div key={s.num} className="flex items-center gap-6 p-6 bg-gray-50 border border-gray-100">
                <div className="font-serif text-4xl font-bold text-brand-black min-w-[80px]">
                  {s.num.includes('+') ? <>{s.num.replace('+', '')}<span className="text-brand-orange">+</span></> : s.num}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}

            {/* Founder */}
            <div className="bg-brand-black p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center font-bold text-white text-base flex-shrink-0">AG</div>
              <div>
                <div className="text-sm font-semibold text-white">Adedoye Godwin A.</div>
                <div className="text-xs text-gray-500 mt-0.5">Founder, OTEI</div>
                <div className="text-[10px] text-brand-orange tracking-widest uppercase mt-1 font-medium">PMP · MBA · Business Leader</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <ScheduleSection />

      {/* SPEAKERS */}
      <SpeakerSection identity="speakers" />

      {/* SPONSORS */}
      <SponsorsSection />

      {/* BOTTOM CTA */}
      <section className="bg-brand-orange py-16 px-5 text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">Ready to be part of this?</h2>
        <p className="text-orange-100 text-sm mb-8 max-w-md mx-auto">
          Join hundreds of students, founders, and professionals at Ogbomoso's most impactful tech and entrepreneurship event.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/register" className="bg-white text-brand-orange px-8 py-3 text-sm font-semibold hover:bg-orange-50 transition-colors">
            Register for Free
          </Link>
          <Link to="/volunteer" className="border border-white text-white px-8 py-3 text-sm font-medium hover:bg-orange-600 transition-colors">
            Volunteer
          </Link>
        </div>
      </section>
    </div>
  )
}
