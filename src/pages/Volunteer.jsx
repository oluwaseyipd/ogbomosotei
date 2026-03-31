import { useState } from 'react'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

const AREAS = ['Registration & Guest Management', 'Media, Publicity & Content Creation', 'Technical Support', 'Logistics & Venue Setup', 'Speaker & VIP Support']

const INITIAL = {
  full_name: '', age_range: '', email: '', phone: '', location: '',
  volunteer_areas: [], skills: '', available_may2: null, attend_briefing: null,
  motivation: '', committed: false,
}

function MultiCheck({ options, selected, onChange }) {
  const toggle = (val) => onChange(selected.includes(val) ? selected.filter(v => v !== val) : [...selected, val])
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

function YesNo({ label, value, onChange }) {
  return (
    <div>
      <label className="label">{label} *</label>
      <div className="flex gap-6 mt-1">
        {[true, false].map(v => (
          <label key={String(v)} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="radio" checked={value === v} onChange={() => onChange(v)} className="accent-brand-orange" />
            {v ? 'Yes' : 'No'}
          </label>
        ))}
      </div>
    </div>
  )
}

export default function Volunteer() {
  const [form, setForm] = useState(INITIAL)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.volunteer_areas.length === 0) return toast.error('Please select at least one volunteer area.')
    if (form.available_may2 === null) return toast.error('Please confirm your availability.')
    if (form.attend_briefing === null) return toast.error('Please confirm briefing attendance.')
    setLoading(true)
    const { error } = await supabase.from('volunteers').insert([form])
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
      <h2 className="font-serif text-3xl font-bold text-brand-black mb-3">Application Received!</h2>
      <p className="text-sm text-gray-500 max-w-sm leading-relaxed">Thank you for applying to volunteer at OTEI 2026. We'll review your application and reach out via email or WhatsApp.</p>
    </div>
  )

  return (
    <>
      <div className="bg-brand-black py-16 px-5 text-center">
        <span className="text-[9px] tracking-widest uppercase text-brand-orange font-semibold">Be Part of the Team</span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mt-3 mb-3">Volunteer at OTEI 2026</h1>
        <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
          Help make this event a success. Join our volunteer team and gain hands-on event experience.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-5 py-16">
        <form onSubmit={handleSubmit} className="space-y-10">

          {/* A. Personal Info */}
          <div>
            <div className="form-section-title">A. Personal Information</div>
            <div className="mb-4"><label className="label">Full Name *</label>
              <input required className="input-field" value={form.full_name} onChange={e => set('full_name', e.target.value)} /></div>
            <div className="mb-4"><label className="label">Age Range *</label>
              <select required className="select-field" value={form.age_range} onChange={e => set('age_range', e.target.value)}>
                <option value="">Select age range</option>
                <option>Under 18</option><option>18–25</option><option>26–35</option><option>36+</option>
              </select></div>
            <div className="mb-4"><label className="label">Email Address *</label>
              <input required type="email" className="input-field" value={form.email} onChange={e => set('email', e.target.value)} /></div>
            <div className="mb-4"><label className="label">Phone Number (WhatsApp preferably) *</label>
              <input required className="input-field" placeholder="e.g. 08012345678" value={form.phone} onChange={e => set('phone', e.target.value)} /></div>
            <div><label className="label">Location (School / Organisation / City)</label>
              <input className="input-field" value={form.location} onChange={e => set('location', e.target.value)} /></div>
          </div>

          {/* B. Skills */}
          <div>
            <div className="form-section-title">B. Skills & Interests</div>
            <label className="label mb-3">Area you'd like to volunteer *</label>
            <MultiCheck options={AREAS} selected={form.volunteer_areas} onChange={v => set('volunteer_areas', v)} />
            <div className="mt-4"><label className="label">Relevant Skills or Experience (Optional)</label>
              <textarea rows={3} className="input-field resize-none" placeholder="Tell us about any relevant experience..." value={form.skills} onChange={e => set('skills', e.target.value)} /></div>
          </div>

          {/* C. Availability */}
          <div>
            <div className="form-section-title">C. Availability</div>
            <div className="space-y-5">
              <YesNo label="Are you available on May 2, 2026?" value={form.available_may2} onChange={v => set('available_may2', v)} />
              <YesNo label="Can you attend a pre-event briefing?" value={form.attend_briefing} onChange={v => set('attend_briefing', v)} />
            </div>
          </div>

          {/* D. Motivation */}
          <div>
            <div className="form-section-title">D. Motivation</div>
            <label className="label">Why do you want to volunteer for this event? *</label>
            <textarea required rows={4} className="input-field resize-none" placeholder="Share your motivation in a few sentences..." value={form.motivation} onChange={e => set('motivation', e.target.value)} />
          </div>

          {/* E. Confirmation */}
          <div className="border-t border-gray-100 pt-6">
            <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" required checked={form.committed} onChange={e => set('committed', e.target.checked)} className="accent-brand-orange mt-0.5" />
              I commit to volunteering responsibly if selected *
            </label>
          </div>

          <button type="submit" disabled={loading}
            className="btn-primary w-full text-center text-sm py-4 disabled:opacity-50">
            {loading ? 'Submitting...' : 'Apply as a Volunteer →'}
          </button>
        </form>
      </div>
    </>
  )
}
