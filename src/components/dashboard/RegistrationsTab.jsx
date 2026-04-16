import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { HiOutlineDownload } from 'react-icons/hi'
import { downloadCSV, fmt, ORANGE } from '../../utils/adminHelpers'

export default function RegistrationsTab({ data, loading }) {
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  const allCategories = [...new Set(data.flatMap(r => r.participant_category || []))]

  const filtered = data.filter(r => {
    const q = search.toLowerCase()
    const matchSearch = !q || `${r.first_name} ${r.last_name} ${r.email} ${r.city_state}`.toLowerCase().includes(q)
    const matchCat = !filterCategory || (r.participant_category || []).includes(filterCategory)
    return matchSearch && matchCat
  })

  const catCount = {}
  data.forEach(r => (r.participant_category || []).forEach(c => { catCount[c] = (catCount[c] || 0) + 1 }))
  const catData = Object.entries(catCount).map(([name, count]) => ({ name: name.split(' ')[0], count }))

  const intCount = {}
  data.forEach(r => (r.interest_areas || []).forEach(i => { intCount[i] = (intCount[i] || 0) + 1 }))
  const intData = Object.entries(intCount).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, count]) => ({ name: name.split('&')[0].trim(), count }))

  return (
    <div>
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

      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input className="input-field max-w-xs text-sm py-2" placeholder="Search name, email, city..." value={search} onChange={e => setSearch(e.target.value)} />
        
          <select className="select-field max-w-xs text-sm py-2" value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
          <option value="">All Categories</option>
          {allCategories.map(c => <option key={c}>{c}</option>)}
        </select>
        
        <div className='flex gap-3'>

        <button onClick={() => downloadCSV(filtered, 'otei_registrations.csv')}
          className="flex items-center gap-1.5 text-xs font-medium border border-gray-200 px-4 py-2 hover:border-brand-orange hover:text-brand-orange transition-colors">
          <HiOutlineDownload size={14} /> Export CSV
        </button>
        <span className="text-xs text-gray-400 self-center">{filtered.length} of {data.length} records</span>
        </div>
        
      </div>

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