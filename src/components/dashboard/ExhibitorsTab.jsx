import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { HiOutlineDownload } from 'react-icons/hi'
import { downloadCSV, fmt } from '../../utils/adminHelpers'

function Badge({ value }) {
  const map = {
    'Premium Booth': 'bg-orange-50 text-brand-orange',
    'Standard Booth': 'bg-gray-100 text-gray-600',
  }
  const cls = map[value] || 'bg-gray-100 text-gray-500'
  return <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-sm ${cls}`}>{value}</span>
}

export default function ExhibitorsTab({ data, loading }) {
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