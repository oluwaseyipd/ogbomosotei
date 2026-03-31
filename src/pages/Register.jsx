import { useState } from 'react'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'
import { FaWhatsapp } from 'react-icons/fa6'

const CATEGORIES = ['Student', 'Aspiring Entrepreneur', 'Startup Founder', 'Business Owner / SME', 'Tech Professional', 'Corporate Professional', 'Government / NGO Representative']
const INTERESTS = ['Technology & Digital Skills', 'Entrepreneurship & Business Growth', 'Startup Funding & Pitching', 'Tax Education', 'Business Compliance & Regulation', 'Marketing & Sales', 'Career Development']
const HOW_HEARD = ['Social Media', 'Friend / Referral', 'School / Organization', 'Sponsor / Partner', 'Other']

const INITIAL = {
  first_name: '', last_name: '', email: '', phone: '', gender: '', city_state: '',
  participant_category: [], org_school: '', role_course: '', years_experience: '',
  interest_areas: [], attending_full: true, how_heard: '',
  accessibility: '', pitch_startup: false, mentorship: false,
  join_community: false, agree_updates: false, agree_attend: false,
}

function PageHeader({ title, subtitle }) {
  return (
    <div className="bg-brand-black py-16 px-5 text-center">
      <span className="text-[9px] tracking-widest uppercase text-brand-orange font-semibold">OTEI 2026</span>
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mt-3 mb-3">{title}</h1>
      <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">{subtitle}</p>
    </div>
  )
}

function MultiCheck({ options, selected, onChange, max }) {
  const toggle = (val) => {
    if (selected.includes(val)) {
      onChange(selected.filter(v => v !== val))
    } else {
      if (max && selected.length >= max) {
        toast.error(`Select up to ${max} options`)
        return
      }
      onChange([...selected, val])
    }
  }
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(o => (
        <button key={o} type="button" onClick={() => toggle(o)}
          className={`px-3 py-1.5 text-xs border font-medium transition-colors duration-150 ${
            selected.includes(o) ? 'bg-brand-orange text-white border-brand-orange' : 'border-gray-200 text-gray-500 hover:border-gray-400'
          }`}>
          {o}
        </button>
      ))}
    </div>
  )
}

export default function Register() {
  const [form, setForm] = useState(INITIAL)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.agree_attend || !form.agree_updates) return toast.error('Please check the required agreements.')
    if (form.participant_category.length === 0) return toast.error('Please select your participant category.')
    setLoading(true)
    const { error } = await supabase.from('registrations').insert([form])
    setLoading(false)
    if (error) { toast.error('Submission failed. Please try again.'); return }
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-5 text-center">
      <div className="w-14 h-14 bg-orange-50 flex items-center justify-center mb-6">
        <span className="text-brand-orange text-2xl">✓</span>
      </div>
      <h2 className="font-serif text-3xl font-bold text-brand-black mb-3">Registration Confirmed!</h2>
      <p className="text-sm text-gray-500 max-w-sm leading-relaxed mb-8">
        Thank you for registering for OTEI 2026. We'll send event updates to your email. See you on May 2!
      </p>
      <a href="https://chat.whatsapp.com/IV3NhSWZ1zTA3kXw5Q5JEy" target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-2 btn-primary">
        <FaWhatsapp size={15} /> Join WhatsApp Group
      </a>
    </div>
  )

  return (
    <>
      <PageHeader title="Register for OTEI 2026" subtitle="Secure your spot at Ogbomoso's flagship tech and entrepreneurship event. Free entry — May 2, 2026." />

      <div className="max-w-2xl mx-auto px-5 py-16">
        <form onSubmit={handleSubmit} className="space-y-10">

          {/* A. Personal Info */}
          <div>
            <div className="form-section-title">A. Personal Information</div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div><label className="label">First Name *</label>
                <input required className="input-field" value={form.first_name} onChange={e => set('first_name', e.target.value)} /></div>
              <div><label className="label">Last Name *</label>
                <input required className="input-field" value={form.last_name} onChange={e => set('last_name', e.target.value)} /></div>
            </div>
            <div className="mb-4"><label className="label">Email Address *</label>
              <input required type="email" className="input-field" value={form.email} onChange={e => set('email', e.target.value)} /></div>
            <div className="mb-4"><label className="label">Phone Number *</label>
              <input required className="input-field" placeholder="e.g. 08012345678" value={form.phone} onChange={e => set('phone', e.target.value)} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="label">Gender (Optional)</label>
                <select className="select-field" value={form.gender} onChange={e => set('gender', e.target.value)}>
                  <option value="">Prefer not to say</option>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select></div>
              <div><label className="label">City / State *</label>
                <input required className="input-field" placeholder="e.g. Ogbomoso, Oyo" value={form.city_state} onChange={e => set('city_state', e.target.value)} /></div>
            </div>
          </div>

          {/* B. Category */}
          <div>
            <div className="form-section-title">B. Participant Category <span className="normal-case text-gray-400 font-normal">(select up to 3)</span></div>
            <MultiCheck options={CATEGORIES} selected={form.participant_category} onChange={v => set('participant_category', v)} max={3} />
          </div>

          {/* C. Org/School */}
          <div>
            <div className="form-section-title">C. Organisation / School Details</div>
            <div className="mb-4"><label className="label">Organisation / School Name</label>
              <input className="input-field" value={form.org_school} onChange={e => set('org_school', e.target.value)} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="label">Role / Course of Study</label>
                <input className="input-field" value={form.role_course} onChange={e => set('role_course', e.target.value)} /></div>
              <div><label className="label">Years of Experience (Optional)</label>
                <select className="select-field" value={form.years_experience} onChange={e => set('years_experience', e.target.value)}>
                  <option value="">Select</option>
                  <option>0–1 years</option><option>1–3 years</option><option>3–5 years</option><option>5–10 years</option><option>10+ years</option>
                </select></div>
            </div>
          </div>

          {/* D. Interests */}
          <div>
            <div className="form-section-title">D. Interest Areas</div>
            <p className="text-xs text-gray-400 mb-3">Which sessions are you most interested in?</p>
            <MultiCheck options={INTERESTS} selected={form.interest_areas} onChange={v => set('interest_areas', v)} />
          </div>

          {/* E. Participation */}
          <div>
            <div className="form-section-title">E. Event Participation</div>
            <div className="mb-4">
              <label className="label">Will you attend the full event on May 2, 2026?</label>
              <div className="flex gap-6 mt-1">
                {['Yes', 'No'].map(o => (
                  <label key={o} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="radio" name="attending" checked={form.attending_full === (o === 'Yes')} onChange={() => set('attending_full', o === 'Yes')} />
                    {o}
                  </label>
                ))}
              </div>
            </div>
            <div><label className="label">How did you hear about this event?</label>
              <select className="select-field" value={form.how_heard} onChange={e => set('how_heard', e.target.value)}>
                <option value="">Select</option>
                {HOW_HEARD.map(o => <option key={o}>{o}</option>)}
              </select></div>
          </div>

          {/* F. Special Requests */}
          <div>
            <div className="form-section-title">F. Special Requests</div>
            <div className="mb-4"><label className="label">Accessibility or Special Needs?</label>
              <input className="input-field" placeholder="Leave blank if none" value={form.accessibility} onChange={e => set('accessibility', e.target.value)} /></div>
            <div className="space-y-3">
              {[
                { key: 'pitch_startup', label: 'I would like to pitch a startup idea' },
                { key: 'mentorship', label: 'I would like to receive post-event mentorship' },
                { key: 'join_community', label: 'I would like to join the community after the event' },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" checked={form[key]} onChange={e => set(key, e.target.checked)} className="accent-brand-orange" />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* Confirmation */}
          <div className="border-t border-gray-100 pt-6 space-y-3">
            <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" required checked={form.agree_updates} onChange={e => set('agree_updates', e.target.checked)} className="accent-brand-orange mt-0.5" />
              I agree to receive event updates and communications *
            </label>
            <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" required checked={form.agree_attend} onChange={e => set('agree_attend', e.target.checked)} className="accent-brand-orange mt-0.5" />
              I understand this is a physical event and I will attend responsibly *
            </label>
            <p className="text-xs text-gray-400 mt-2">Your information will be kept confidential and used only for event communication and planning.</p>
          </div>

          <button type="submit" disabled={loading}
            className="btn-primary w-full text-center text-sm py-4 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Submitting...' : 'Register for the Event →'}
          </button>
        </form>

        <div className="mt-8 p-5 bg-gray-50 border border-gray-100 flex items-start gap-3">
          <FaWhatsapp size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-brand-black mb-1">Join the WhatsApp Community</p>
            <p className="text-xs text-gray-500 mb-2">Stay updated with event news and connect with other attendees.</p>
            <a href="https://chat.whatsapp.com/IV3NhSWZ1zTA3kXw5Q5JEy" target="_blank" rel="noopener noreferrer"
              className="text-xs text-brand-orange font-semibold hover:underline">Click here to join →</a>
          </div>
        </div>
      </div>
    </>
  )
}
