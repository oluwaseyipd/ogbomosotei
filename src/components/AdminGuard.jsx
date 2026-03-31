import { useState } from 'react'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'otei-admin-2026'
const SESSION_KEY = 'otei_admin_auth'

export default function AdminGuard({ children }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === 'true')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true')
      setAuthed(true)
    } else {
      setError('Incorrect password. Please try again.')
      setPassword('')
    }
  }

  if (authed) return children

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="font-sans font-semibold text-sm tracking-widest uppercase text-white mb-1">OTEI</div>
          <div className="text-[9px] tracking-widest uppercase text-brand-orange font-medium mb-6">Admin Dashboard</div>
          <h1 className="font-serif text-2xl font-bold text-white">Restricted Access</h1>
          <p className="text-gray-500 text-xs mt-2">Enter the admin password to continue.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="label text-gray-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              className="input-field bg-gray-900 border-gray-700 text-white placeholder-gray-600 focus:border-brand-orange"
              placeholder="Enter admin password"
              autoFocus
            />
            {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
          </div>
          <button type="submit" className="btn-primary w-full text-center">
            Access Dashboard
          </button>
        </form>

        <p className="text-center text-gray-700 text-xs mt-8">
          © 2026 OTEI &mdash; <a href="/" className="text-gray-500 hover:text-white">Back to site</a>
        </p>
      </div>
    </div>
  )
}
