import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function AdminGuard({ children }) {
  const [session, setSession] = useState(undefined)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError('Incorrect email or password. Please try again.')
      setPassword('')
    }
  }

  if (session === undefined) return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center">
      <div className="text-gray-600 text-xs tracking-widest uppercase">Loading...</div>
    </div>
  )

  if (session) return children

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="font-sans font-semibold text-sm tracking-widest uppercase text-white mb-1">OTEI</div>
          <div className="text-[9px] tracking-widest uppercase text-brand-orange font-medium mb-6">Admin Dashboard</div>
          <h1 className="font-serif text-2xl font-bold text-white">Restricted Access</h1>
          <p className="text-gray-500 text-xs mt-2">Sign in with your admin account to continue.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="label text-gray-400">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => { setEmail(e.target.value); setError('') }}
              className="input-field bg-gray-900 border-gray-700 text-white placeholder-gray-600 focus:border-brand-orange"
              placeholder="admin@ogbomosotei.com"
              autoFocus
            />
          </div>
          <div>
            <label className="label text-gray-400">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              className="input-field bg-gray-900 border-gray-700 text-white placeholder-gray-600 focus:border-brand-orange"
              placeholder="Enter your password"
            />
            {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full text-center disabled:opacity-50">
            {loading ? 'Signing in...' : 'Access Dashboard'}
          </button>
        </form>

        <p className="text-center text-gray-700 text-xs mt-8">
          © 2026 OTEI &mdash; <a href="/" className="text-gray-500 hover:text-white">Back to site</a>
        </p>
      </div>
    </div>
  )
}