import { useState } from 'react'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

const INDUSTRIES = ['Tech', 'Finance', 'Logistics', 'Education', 'Legal / Compliance', 'Beauty Industry', 'FMCG', 'Other']
const PACKAGES = [
  { value: 'Standard Booth', label: 'Standard Booth', desc: 'Table, chairs, banner space. Ideal for product displays and brand awareness.' },
  { value: 'Premium Booth', label: 'Premium Booth', desc: 'Larger space, prime location, additional branding opportunities.' },
]

const INITIAL = {
  business_name: '', industry: '', industry_other: '', description: '',
  contact_name: '', email: '', phone: '',
  exhibition_package: '', products_services: '', power_internet: false,
  legal_compliant: false, agreed_terms: false,
}

export default function Exhibition() {
  const [form, setForm] = useState(INITIAL)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const descWords = form.description.trim().split(/\s+/).filter(Boolean).length

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.exhibition_package) return toast.error('Please select an exhibition package.')
    if (descWords > 150) return toast.error('Business description must be 150 words or less.')
    if (!form.legal_compliant) return toast.error('Please confirm your business is legally compliant.')
    if (!form.agreed_terms) return toast.error('Please agree to the exhibition terms.')
    setLoading(true)
    const { error } = await supabase.from('exhibitors').insert([form])
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
      <h2 className="font-serif text-3xl font-bold text-brand-black mb-3">Registration Received!</h2>
      <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
        Thank you for registering to exhibit at OTEI 2026. Our team will review your application and contact you with booth assignment details.
      </p>
    </div>
  )

  return (
    <>
      {/* Header */}
      <div className="bg-brand-black py-16 px-5 text-center">
        <span className="text-[9px] tracking-widest uppercase text-brand-orange font-semibold">Showcase Your Business</span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mt-3 mb-3">Exhibition Booth</h1>
        <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
          Display your products and services to hundreds of attendees — students, founders, investors, and professionals.
        </p>
      </div>

      {/* Package Cards */}
      <div className="bg-gray-50 border-b border-gray-100 py-12 px-5">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-brand-black text-center mb-8">Exhibition Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5">
            {PACKAGES.map(p => (
              <button key={p.value} type="button"
                onClick={() => set('exhibition_package', p.value)}
                className={`p-7 text-left border transition-all duration-200 ${
                  form.exhibition_package === p.value
                    ? 'bg-brand-black border-brand-black'
                    : 'bg-white border-gray-100 hover:border-gray-300'
                }`}>
                <div className={`text-[9px] tracking-widest uppercase font-semibold mb-2 ${form.exhibition_package === p.value ? 'text-brand-orange' : 'text-gray-400'}`}>
                  {p.label}
                </div>
                <p className={`text-sm leading-relaxed ${form.exhibition_package === p.value ? 'text-gray-400' : 'text-gray-500'}`}>
                  {p.desc}
                </p>
                {form.exhibition_package === p.value && (
                  <div className="mt-3 text-[9px] font-semibold tracking-widest uppercase text-brand-orange">✓ Selected</div>
                )}
              </button>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">Pricing details will be communicated after application review.</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-5 py-16">
        <form onSubmit={handleSubmit} className="space-y-10">

          {/* A. Business Info */}
          <div>
            <div className="form-section-title">A. Business Information</div>
            <div className="mb-4"><label className="label">Business / Brand Name *</label>
              <input required className="input-field" value={form.business_name} onChange={e => set('business_name', e.target.value)} /></div>
            <div className="mb-4">
              <label className="label">Industry Category *</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {INDUSTRIES.map(ind => (
                  <button key={ind} type="button" onClick={() => set('industry', ind)}
                    className={`px-3 py-1.5 text-xs border font-medium transition-colors ${
                      form.industry === ind ? 'bg-brand-orange text-white border-brand-orange' : 'border-gray-200 text-gray-500 hover:border-gray-400'
                    }`}>
                    {ind}
                  </button>
                ))}
              </div>
              {form.industry === 'Other' && (
                <input className="input-field mt-2" placeholder="Please specify your industry..." value={form.industry_other} onChange={e => set('industry_other', e.target.value)} />
              )}
            </div>
            <div>
              <label className="label">Brief Description of Business *</label>
              <textarea required rows={4} className="input-field resize-none"
                placeholder="Describe what your business does (max 150 words)..."
                value={form.description}
                onChange={e => set('description', e.target.value)} />
              <div className={`text-xs mt-1 text-right ${descWords > 150 ? 'text-red-400' : 'text-gray-400'}`}>
                {descWords} / 150 words
              </div>
            </div>
          </div>

          {/* B. Contact */}
          <div>
            <div className="form-section-title">B. Contact Information</div>
            <div className="mb-4"><label className="label">Contact Person Full Name *</label>
              <input required className="input-field" value={form.contact_name} onChange={e => set('contact_name', e.target.value)} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="label">Email Address *</label>
                <input required type="email" className="input-field" value={form.email} onChange={e => set('email', e.target.value)} /></div>
              <div><label className="label">Phone Number *</label>
                <input required className="input-field" value={form.phone} onChange={e => set('phone', e.target.value)} /></div>
            </div>
          </div>

          {/* C. Exhibition Details */}
          <div>
            <div className="form-section-title">C. Exhibition Details</div>
            <div className="mb-1">
              <label className="label">Selected Package</label>
              <div className={`input-field text-sm ${form.exhibition_package ? 'text-brand-black' : 'text-gray-400'}`}>
                {form.exhibition_package || 'Select a package from the cards above'}
              </div>
            </div>
            <div className="mt-4 mb-4"><label className="label">Products / Services to be Displayed</label>
              <textarea rows={3} className="input-field resize-none" placeholder="List the products or services you'll display at your booth..." value={form.products_services} onChange={e => set('products_services', e.target.value)} /></div>
            <div>
              <label className="label">Power / Internet Requirement?</label>
              <div className="flex gap-6 mt-1">
                {[true, false].map(v => (
                  <label key={String(v)} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="radio" checked={form.power_internet === v} onChange={() => set('power_internet', v)} className="accent-brand-orange" />
                    {v ? 'Yes' : 'No'}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* D & E. Compliance + Confirmation */}
          <div className="border-t border-gray-100 pt-6 space-y-4">
            <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" required checked={form.legal_compliant} onChange={e => set('legal_compliant', e.target.checked)} className="accent-brand-orange mt-0.5" />
              Our business operates legally and complies with applicable regulations *
            </label>
            <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" required checked={form.agreed_terms} onChange={e => set('agreed_terms', e.target.checked)} className="accent-brand-orange mt-0.5" />
              I agree to the event exhibition terms and conditions *
            </label>
          </div>

          <button type="submit" disabled={loading}
            className="btn-primary w-full text-center text-sm py-4 disabled:opacity-50">
            {loading ? 'Submitting...' : 'Register as an Exhibitor →'}
          </button>

          <p className="text-xs text-center text-gray-400">
            Questions? Email us at{' '}
            <a href="mailto:info@ogbomosotei.com" className="text-brand-orange hover:underline">info@ogbomosotei.com</a>
          </p>
        </form>
      </div>
    </>
  )
}
