import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { sendSponsorEmail } from '../lib/email'
import toast from 'react-hot-toast'

const ORG_TYPES = ['Corporate', 'Financial Institution', 'Government Agency', 'NGO / Development Partner', 'Other']
const TIERS = [
  { value: 'Platinum Sponsor - ₦3,000,000', label: 'Platinum Sponsor', price: '₦3,000,000', desc: 'Maximum brand visibility, speaking slot, exhibition booth, VIP access' },
  { value: 'Gold Sponsor - ₦2,000,000', label: 'Gold Sponsor', price: '₦2,000,000', desc: 'Premium brand presence, speaking opportunity, branded materials' },
  { value: 'Silver Sponsor - ₦500,000', label: 'Silver Sponsor', price: '₦500,000', desc: 'Community-level partnership, logo placement, social media mention' },
  { value: 'Custom Partnership', label: 'Custom Partnership', price: 'Custom', desc: 'Tailored package — define your own terms and budget' },
]
const INTEREST_AREAS = ['Brand Visibility', 'Speaking Opportunity', 'Exhibition Booth', 'CSR / Community Impact', 'Tax & Compliance Education']
const HOW_HEARD = ['Social Media', 'Industry Network', 'Referral', 'Email / Newsletter', 'Other']

const INITIAL = {
  org_name: '', org_type: '', org_type_other: '', website: '', address: '',
  contact_name: '', job_title: '', email: '', phone: '',
  interest_areas: [], how_heard: '', outcomes: '', info_accurate: false,
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

export default function Sponsor() {
  const [form, setForm] = useState(INITIAL)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.sponsorship_tier) return toast.error('Please select a sponsorship tier.')
    if (!form.info_accurate) return toast.error('Please confirm the information is accurate.')
    setLoading(true)
    const { error } = await supabase.from('sponsors').insert([form])
    setLoading(false)
    if (error) { toast.error('Submission failed. Please try again.'); return }
    await sendSponsorEmail(form)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-5 text-center">
      <div className="w-14 h-14 bg-orange-50 flex items-center justify-center mb-6">
        <span className="text-brand-orange text-2xl">✓</span>
      </div>
      <h2 className="font-serif text-3xl font-bold text-brand-black mb-3">Application Submitted!</h2>
      <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
        Thank you for your interest in sponsoring OTEI 2026. Our team will review your application and reach out within 2–3 business days.
      </p>
    </div>
  )

  return (
    <>
      {/* Header */}
      <div className="bg-brand-black py-16 px-5 text-center">
        <span className="text-[9px] tracking-widest uppercase text-brand-orange font-semibold">Partner With Us</span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mt-3 mb-3">Sponsor OTEI 2026</h1>
        <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
          Align your brand with Ogbomoso's most impactful innovation event. Reach students, founders, professionals, and SMEs in one room.
        </p>
      </div>

      {/* Tier Cards */}
      <div className="bg-gray-50 border-b border-gray-100 py-12 px-5">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-brand-black text-center mb-8">Sponsorship Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0.5">
            {TIERS.map(t => (
              <button key={t.value} type="button"
                onClick={() => set('sponsorship_tier', t.value)}
                className={`p-6 text-left border transition-all duration-200 ${
                  form.sponsorship_tier === t.value
                    ? 'bg-brand-black border-brand-black'
                    : 'bg-white border-gray-100 hover:border-gray-300'
                }`}>
                <div className={`text-[9px] tracking-widest uppercase font-semibold mb-2 ${form.sponsorship_tier === t.value ? 'text-brand-orange' : 'text-gray-400'}`}>
                  {t.label}
                </div>
                <div className={`font-serif text-2xl font-bold mb-2 ${form.sponsorship_tier === t.value ? 'text-white' : 'text-brand-black'}`}>
                  {t.price}
                </div>
                <p className={`text-xs leading-relaxed ${form.sponsorship_tier === t.value ? 'text-gray-400' : 'text-gray-400'}`}>
                  {t.desc}
                </p>
                {form.sponsorship_tier === t.value && (
                  <div className="mt-3 text-[9px] font-semibold tracking-widest uppercase text-brand-orange">✓ Selected</div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-5 py-16">
        <form onSubmit={handleSubmit} className="space-y-10">

          {/* A. Organisation */}
          <div>
            <div className="form-section-title">A. Organisation Information</div>
            <div className="mb-4"><label className="label">Organisation / Company Name *</label>
              <input required className="input-field" value={form.org_name} onChange={e => set('org_name', e.target.value)} /></div>
            <div className="mb-4">
              <label className="label">Organisation Type *</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {ORG_TYPES.map(o => (
                  <button key={o} type="button" onClick={() => set('org_type', o)}
                    className={`px-3 py-1.5 text-xs border font-medium transition-colors ${
                      form.org_type === o ? 'bg-brand-orange text-white border-brand-orange' : 'border-gray-200 text-gray-500 hover:border-gray-400'
                    }`}>
                    {o}
                  </button>
                ))}
              </div>
              {form.org_type === 'Other' && (
                <input className="input-field mt-2" placeholder="Please specify..." value={form.org_type_other} onChange={e => set('org_type_other', e.target.value)} />
              )}
            </div>
            <div className="mb-4"><label className="label">Website (Optional)</label>
              <input type="url" className="input-field" placeholder="https://" value={form.website} onChange={e => set('website', e.target.value)} /></div>
            <div><label className="label">Office Address</label>
              <input className="input-field" value={form.address} onChange={e => set('address', e.target.value)} /></div>
          </div>

          {/* B. Contact */}
          <div>
            <div className="form-section-title">B. Contact Person Details</div>
            <div className="mb-4"><label className="label">Full Name *</label>
              <input required className="input-field" value={form.contact_name} onChange={e => set('contact_name', e.target.value)} /></div>
            <div className="mb-4"><label className="label">Job Title *</label>
              <input required className="input-field" value={form.job_title} onChange={e => set('job_title', e.target.value)} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="label">Email Address *</label>
                <input required type="email" className="input-field" value={form.email} onChange={e => set('email', e.target.value)} /></div>
              <div><label className="label">Phone Number *</label>
                <input required className="input-field" value={form.phone} onChange={e => set('phone', e.target.value)} /></div>
            </div>
          </div>

          {/* C. Sponsorship Details */}
          <div>
            <div className="form-section-title">C. Sponsorship Details</div>
            {/* <div className="mb-1">
              <label className="label">Selected Tier</label>
              <div className={`input-field text-sm ${form.sponsorship_tier ? 'text-brand-black' : 'text-gray-400'}`}>
                {form.sponsorship_tier || 'Select a tier from the cards above'}
              </div>
            </div>
            {form.sponsorship_tier === 'Custom Partnership' && (
              <div className="mt-4"><label className="label">Estimated Sponsorship Budget (Optional)</label>
                <input className="input-field" placeholder="e.g. ₦150,000" value={form.custom_budget} onChange={e => set('custom_budget', e.target.value)} /></div>
            )} */}
            <div className="mt-4">
              <label className="label mb-3">Area of Interest (Multiple choice)</label>
              <MultiCheck options={INTEREST_AREAS} selected={form.interest_areas} onChange={v => set('interest_areas', v)} />
            </div>
          </div>

          {/* D. Additional Info */}
          <div>
            <div className="form-section-title">D. Additional Information</div>
            <div className="mb-4">
              <label className="label">How did you hear about this event?</label>
              <select className="select-field" value={form.how_heard} onChange={e => set('how_heard', e.target.value)}>
                <option value="">Select</option>
                {HOW_HEARD.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="label">What outcomes are you looking to achieve as a sponsor?</label>
              <textarea rows={4} className="input-field resize-none" placeholder="Tell us your goals and expectations..." value={form.outcomes} onChange={e => set('outcomes', e.target.value)} />
            </div>
          </div>

          {/* E. Confirmation */}
          <div className="border-t border-gray-100 pt-6">
            <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" required checked={form.info_accurate} onChange={e => set('info_accurate', e.target.checked)} className="accent-brand-orange mt-0.5" />
              I confirm that the information provided is accurate *
            </label>
          </div>

          <button type="submit" disabled={loading}
            className="btn-primary w-full text-center text-sm py-4 disabled:opacity-50">
            {loading ? 'Submitting...' : 'Apply as a Sponsor →'}
          </button>

          <p className="text-xs text-center text-gray-400">
            Questions? Contact us at{' '}
            <a href="mailto:info@ogbomosotei.com" className="text-brand-orange hover:underline">info@ogbomosotei.com</a>
          </p>
        </form>
      </div>
    </>
  )
}
