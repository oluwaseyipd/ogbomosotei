import { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { HiOutlineDownload } from 'react-icons/hi'
import { downloadCSV, fmt, CHART_COLORS } from '../../utils/adminHelpers'

export default function VolunteersTab({ data, loading }) {
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