import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { HiOutlineDownload, HiOutlineRefresh, HiOutlineLogout } from 'react-icons/hi'

const SESSION_KEY = 'otei_admin_auth'
const TABLES = ['registrations', 'volunteers', 'sponsors', 'exhibitors']
const ORANGE = '#F97316'
const CHART_COLORS = ['#F97316', '#111111', '#FBBF24', '#6b7280', '#d1d5db']

// ─── Helpers ──────────────────────────────────────────────────────
function downloadCSV(data, filename) {
  if (!data.length) return
  const keys = Object.keys(data[0])
  const rows = [keys.join(','), ...data.map(r => keys.map(k => {
    const v = Array.isArray(r[k]) ? r[k].join('; ') : r[k]
    return `"${String(v ?? '').replace(/"/g, '""')}"`
  }).join(','))]
  const blob = new Blob([rows.join('\n')], { type: 'text/csv' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
}

function fmt(date) {
  return new Date(date).toLocaleDateString('en-NG', { day: '2-digit', month: 'short', year: 'numeric' })
}

function StatCard({ label, value, sub }) {
  return (
    <div className="bg-white border border-gray-100 p-5">
      <div className="text-[10px] tracking-widest uppercase text-gray-400 font-medium mb-1">{label}</div>
      <div className="font-serif text-4xl font-bold text-brand-black">{value}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </div>
  )
}

function Badge({ value }) {
  const map = {
    'Platinum Sponsor - ₦3,000,000': 'bg-yellow-50 text-yellow-700',
    'Gold Sponsor - ₦2,000,000': 'bg-orange-50 text-orange-600',
    'Silver Sponsor - ₦500,000': 'bg-gray-100 text-gray-600',
    'Custom Partnership': 'bg-blue-50 text-blue-600',
    'Premium Booth': 'bg-orange-50 text-brand-orange',
    'Standard Booth': 'bg-gray-100 text-gray-600',
  }
  const cls = map[value] || 'bg-gray-100 text-gray-500'
  return <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-sm ${cls}`}>{value}</span>
}

// ─── Tab: Registrations ────────────────────────────────────────────
function RegistrationsTab({ data, loading }) {
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  const allCategories = [...new Set(data.flatMap(r => r.participant_category || []))]

  const filtered = data.filter(r => {
    const q = search.toLowerCase()
    const matchSearch = !q || `${r.first_name} ${r.last_name} ${r.email} ${r.city_state}`.toLowerCase().includes(q)
    const matchCat = !filterCategory || (r.participant_category || []).includes(filterCategory)
    return matchSearch && matchCat
  })

  // Chart: categories
  const catCount = {}
  data.forEach(r => (r.participant_category || []).forEach(c => { catCount[c] = (catCount[c] || 0) + 1 }))
  const catData = Object.entries(catCount).map(([name, count]) => ({ name: name.split(' ')[0], count }))

  // Chart: interests
  const intCount = {}
  data.forEach(r => (r.interest_areas || []).forEach(i => { intCount[i] = (intCount[i] || 0) + 1 }))
  const intData = Object.entries(intCount).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, count]) => ({ name: name.split('&')[0].trim(), count }))

  return (
    <div>
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 mb-6">
        <div className="bg-white border border-gray-100 p-5">
          <div className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-wide">By Participant Category</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={catData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 0 }} />
              <Bar dataKey="count" fill={ORANGE} radius={0} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white border border-gray-100 p-5">
          <div className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-wide">Top Interest Areas</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={intData} layout="vertical" margin={{ top: 0, right: 0, left: 60, bottom: 0 }}>
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 9 }} width={60} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 0 }} />
              <Bar dataKey="count" fill="#111" radius={0} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input className="input-field max-w-xs text-sm py-2" placeholder="Search name, email, city..." value={search} onChange={e => setSearch(e.target.value)} />
        <select className="select-field max-w-xs text-sm py-2" value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
          <option value="">All Categories</option>
          {allCategories.map(c => <option key={c}>{c}</option>)}
        </select>
        <button onClick={() => downloadCSV(filtered, 'otei_registrations.csv')}
          className="flex items-center gap-1.5 text-xs font-medium border border-gray-200 px-4 py-2 hover:border-brand-orange hover:text-brand-orange transition-colors">
          <HiOutlineDownload size={14} /> Export CSV
        </button>
        <span className="text-xs text-gray-400 self-center">{filtered.length} of {data.length} records</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {['Name', 'Email', 'Phone', 'City/State', 'Category', 'Pitch?', 'Registered'].map(h => (
                <th key={h} className="text-left px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wide text-[10px] whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="text-center py-10 text-gray-400 text-sm">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-10 text-gray-400 text-sm">No records found.</td></tr>
            ) : filtered.map(r => (
              <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-3 py-2.5 font-medium text-brand-black whitespace-nowrap">{r.first_name} {r.last_name}</td>
                <td className="px-3 py-2.5 text-gray-500">{r.email}</td>
                <td className="px-3 py-2.5 text-gray-500">{r.phone}</td>
                <td className="px-3 py-2.5 text-gray-500">{r.city_state}</td>
                <td className="px-3 py-2.5">
                  <div className="flex flex-wrap gap-1">
                    {(r.participant_category || []).slice(0, 2).map(c => (
                      <span key={c} className="px-1.5 py-0.5 bg-orange-50 text-brand-orange text-[9px] font-medium">{c.split(' ')[0]}</span>
                    ))}
                  </div>
                </td>
                <td className="px-3 py-2.5 text-center">{r.pitch_startup ? '✓' : '—'}</td>
                <td className="px-3 py-2.5 text-gray-400 whitespace-nowrap">{fmt(r.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Tab: Volunteers ───────────────────────────────────────────────
function VolunteersTab({ data, loading }) {
  const [search, setSearch] = useState('')
  const filtered = data.filter(r => !search || `${r.full_name} ${r.email} ${r.location}`.toLowerCase().includes(search.toLowerCase()))

  const areaCount = {}
  data.forEach(r => (r.volunteer_areas || []).forEach(a => { areaCount[a] = (areaCount[a] || 0) + 1 }))
  const areaData = Object.entries(areaCount).map(([name, value]) => ({ name: name.split('&')[0].trim(), value }))

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 mb-6">
        <div className="bg-white border border-gray-100 p-5">
          <div className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-wide">Volunteer Areas</div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={areaData} dataKey="value" nameKey="name" outerRadius={70} label={({ name, percent }) => `${name} ${Math.round(percent * 100)}%`} labelLine={false} fontSize={9}>
                {areaData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 0 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white border border-gray-100 p-5 flex flex-col gap-3">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Quick Stats</div>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div className="bg-gray-50 p-3 text-center">
              <div className="font-serif text-2xl font-bold text-brand-black">{data.filter(r => r.available_may2).length}</div>
              <div className="text-[10px] text-gray-400 mt-1">Available May 2</div>
            </div>
            <div className="bg-gray-50 p-3 text-center">
              <div className="font-serif text-2xl font-bold text-brand-black">{data.filter(r => r.attend_briefing).length}</div>
              <div className="text-[10px] text-gray-400 mt-1">Briefing Confirmed</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        <input className="input-field max-w-xs text-sm py-2" placeholder="Search name, email..." value={search} onChange={e => setSearch(e.target.value)} />
        <button onClick={() => downloadCSV(filtered, 'otei_volunteers.csv')}
          className="flex items-center gap-1.5 text-xs font-medium border border-gray-200 px-4 py-2 hover:border-brand-orange hover:text-brand-orange transition-colors">
          <HiOutlineDownload size={14} /> Export CSV
        </button>
        <span className="text-xs text-gray-400 self-center">{filtered.length} records</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {['Name', 'Email', 'Phone', 'Age', 'Location', 'Areas', 'Available', 'Applied'].map(h => (
                <th key={h} className="text-left px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wide text-[10px] whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className="text-center py-10 text-gray-400 text-sm">Loading...</td></tr>
            ) : filtered.map(r => (
              <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-3 py-2.5 font-medium text-brand-black whitespace-nowrap">{r.full_name}</td>
                <td className="px-3 py-2.5 text-gray-500">{r.email}</td>
                <td className="px-3 py-2.5 text-gray-500">{r.phone}</td>
                <td className="px-3 py-2.5 text-gray-500">{r.age_range}</td>
                <td className="px-3 py-2.5 text-gray-500">{r.location}</td>
                <td className="px-3 py-2.5">
                  <div className="flex flex-wrap gap-1">
                    {(r.volunteer_areas || []).slice(0, 2).map(a => (
                      <span key={a} className="px-1.5 py-0.5 bg-orange-50 text-brand-orange text-[9px] font-medium">{a.split('&')[0].trim()}</span>
                    ))}
                  </div>
                </td>
                <td className="px-3 py-2.5 text-center">{r.available_may2 ? '✓' : '✗'}</td>
                <td className="px-3 py-2.5 text-gray-400 whitespace-nowrap">{fmt(r.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Tab: Sponsors ─────────────────────────────────────────────────
function SponsorsTab({ data, loading }) {
  const [search, setSearch] = useState('')
  const filtered = data.filter(r => !search || `${r.org_name} ${r.email} ${r.contact_name}`.toLowerCase().includes(search.toLowerCase()))

  const tierCount = {}
  data.forEach(r => { tierCount[r.sponsorship_tier] = (tierCount[r.sponsorship_tier] || 0) + 1 })
  const tierData = Object.entries(tierCount).map(([name, value]) => ({ name: name.split(' ')[0], value }))

  return (
    <div>
      <div className="bg-white border border-gray-100 p-5 mb-6">
        <div className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-wide">Applications by Tier</div>
        <div className="flex gap-4 flex-wrap">
          {tierData.map((t, i) => (
            <div key={t.name} className="flex items-center gap-2">
              <div className="w-3 h-3" style={{ background: CHART_COLORS[i] }} />
              <span className="text-xs text-gray-600">{t.name}: <strong>{t.value}</strong></span>
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={tierData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip contentStyle={{ fontSize: 11, borderRadius: 0 }} />
            <Bar dataKey="value" fill={ORANGE} radius={0} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-3 mb-4">
        <input className="input-field max-w-xs text-sm py-2" placeholder="Search organisation, name, email..." value={search} onChange={e => setSearch(e.target.value)} />
        <button onClick={() => downloadCSV(filtered, 'otei_sponsors.csv')}
          className="flex items-center gap-1.5 text-xs font-medium border border-gray-200 px-4 py-2 hover:border-brand-orange hover:text-brand-orange transition-colors">
          <HiOutlineDownload size={14} /> Export CSV
        </button>
        <span className="text-xs text-gray-400 self-center">{filtered.length} records</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {['Organisation', 'Contact', 'Email', 'Phone', 'Tier', 'Type', 'Applied'].map(h => (
                <th key={h} className="text-left px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wide text-[10px] whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="text-center py-10 text-gray-400 text-sm">Loading...</td></tr>
            ) : filtered.map(r => (
              <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-3 py-2.5 font-medium text-brand-black whitespace-nowrap">{r.org_name}</td>
                <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">{r.contact_name}</td>
                <td className="px-3 py-2.5 text-gray-500">{r.email}</td>
                <td className="px-3 py-2.5 text-gray-500">{r.phone}</td>
                <td className="px-3 py-2.5"><Badge value={r.sponsorship_tier} /></td>
                <td className="px-3 py-2.5 text-gray-500">{r.org_type}</td>
                <td className="px-3 py-2.5 text-gray-400 whitespace-nowrap">{fmt(r.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Tab: Exhibitors ───────────────────────────────────────────────
function ExhibitorsTab({ data, loading }) {
  const [search, setSearch] = useState('')
  const filtered = data.filter(r => !search || `${r.business_name} ${r.email} ${r.industry}`.toLowerCase().includes(search.toLowerCase()))

  const indCount = {}
  data.forEach(r => { indCount[r.industry] = (indCount[r.industry] || 0) + 1 })
  const indData = Object.entries(indCount).map(([name, value]) => ({ name, value }))

  return (
    <div>
      <div className="bg-white border border-gray-100 p-5 mb-6">
        <div className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-wide">Exhibitors by Industry</div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={indData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis dataKey="name" tick={{ fontSize: 9 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip contentStyle={{ fontSize: 11, borderRadius: 0 }} />
            <Bar dataKey="value" fill="#111" radius={0} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-3 mb-4">
        <input className="input-field max-w-xs text-sm py-2" placeholder="Search business, email..." value={search} onChange={e => setSearch(e.target.value)} />
        <button onClick={() => downloadCSV(filtered, 'otei_exhibitors.csv')}
          className="flex items-center gap-1.5 text-xs font-medium border border-gray-200 px-4 py-2 hover:border-brand-orange hover:text-brand-orange transition-colors">
          <HiOutlineDownload size={14} /> Export CSV
        </button>
        <span className="text-xs text-gray-400 self-center">{filtered.length} records</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {['Business', 'Industry', 'Contact', 'Email', 'Phone', 'Package', 'Power?', 'Applied'].map(h => (
                <th key={h} className="text-left px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wide text-[10px] whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className="text-center py-10 text-gray-400 text-sm">Loading...</td></tr>
            ) : filtered.map(r => (
              <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-3 py-2.5 font-medium text-brand-black whitespace-nowrap">{r.business_name}</td>
                <td className="px-3 py-2.5 text-gray-500">{r.industry}</td>
                <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">{r.contact_name}</td>
                <td className="px-3 py-2.5 text-gray-500">{r.email}</td>
                <td className="px-3 py-2.5 text-gray-500">{r.phone}</td>
                <td className="px-3 py-2.5"><Badge value={r.exhibition_package} /></td>
                <td className="px-3 py-2.5 text-center">{r.power_internet ? '✓' : '—'}</td>
                <td className="px-3 py-2.5 text-gray-400 whitespace-nowrap">{fmt(r.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Main Admin Dashboard ──────────────────────────────────────────
export default function Admin() {
  const [activeTab, setActiveTab] = useState('registrations')
  const [allData, setAllData] = useState({ registrations: [], volunteers: [], sponsors: [], exhibitors: [] })
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    const results = await Promise.all(TABLES.map(t => supabase.from(t).select('*').order('created_at', { ascending: false })))
    const newData = {}
    TABLES.forEach((t, i) => { newData[t] = results[i].data || [] })
    setAllData(newData)
    setLastRefresh(new Date())
    setLoading(false)
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    window.location.reload()
  }

  const tabs = [
    { key: 'registrations', label: 'Registrations', count: allData.registrations.length },
    { key: 'volunteers', label: 'Volunteers', count: allData.volunteers.length },
    { key: 'sponsors', label: 'Sponsors', count: allData.sponsors.length },
    { key: 'exhibitors', label: 'Exhibitors', count: allData.exhibitors.length },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-brand-black border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div>
          <div className="font-sans font-semibold text-sm tracking-widest uppercase text-white">OTEI Admin</div>
          <div className="text-[9px] tracking-widest uppercase text-brand-orange font-medium">Dashboard</div>
        </div>
        <div className="flex items-center gap-4">
          {lastRefresh && (
            <span className="text-[10px] text-gray-600 hidden md:block">
              Last refreshed: {lastRefresh.toLocaleTimeString()}
            </span>
          )}
          <button onClick={fetchAll} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
            <HiOutlineRefresh size={14} /> Refresh
          </button>
          <a href="/" className="text-xs text-gray-500 hover:text-white transition-colors">View Site</a>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-400 transition-colors">
            <HiOutlineLogout size={14} /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5 mb-8">
          <StatCard label="Total Registrations" value={allData.registrations.length} sub="Event attendees" />
          <StatCard label="Volunteers" value={allData.volunteers.length} sub="Applications received" />
          <StatCard label="Sponsors" value={allData.sponsors.length} sub="Applications received" />
          <StatCard label="Exhibitors" value={allData.exhibitors.length} sub="Booth registrations" />
        </div>

        {/* Tabs */}
        <div className="flex gap-0.5 mb-6 border-b border-gray-200">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className={`px-5 py-3 text-xs font-semibold tracking-wide transition-colors duration-150 relative ${
                activeTab === t.key
                  ? 'text-brand-orange border-b-2 border-brand-orange -mb-px'
                  : 'text-gray-400 hover:text-brand-black'
              }`}>
              {t.label}
              <span className={`ml-2 px-1.5 py-0.5 text-[10px] font-bold rounded-sm ${activeTab === t.key ? 'bg-orange-50 text-brand-orange' : 'bg-gray-100 text-gray-400'}`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white border border-gray-100 p-6">
          {activeTab === 'registrations' && <RegistrationsTab data={allData.registrations} loading={loading} />}
          {activeTab === 'volunteers' && <VolunteersTab data={allData.volunteers} loading={loading} />}
          {activeTab === 'sponsors' && <SponsorsTab data={allData.sponsors} loading={loading} />}
          {activeTab === 'exhibitors' && <ExhibitorsTab data={allData.exhibitors} loading={loading} />}
        </div>
      </div>
    </div>
  )
}
