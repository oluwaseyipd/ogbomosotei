import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { HiOutlineDownload } from 'react-icons/hi'
import { downloadCSV, fmt, CHART_COLORS, ORANGE } from '../../utils/adminHelpers'

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

export default function SponsorsTab({ data, loading }) {
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

      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input className="input-field max-w-xs text-sm py-2" placeholder="Search organisation, name, email..." value={search} onChange={e => setSearch(e.target.value)} />
        <div className='flex gap-3'>
 <button onClick={() => downloadCSV(filtered, 'otei_sponsors.csv')}
          className="flex items-center gap-1.5 text-xs font-medium border border-gray-200 px-4 py-2 hover:border-brand-orange hover:text-brand-orange transition-colors">
          <HiOutlineDownload size={14} /> Export CSV
        </button>
        <span className="text-xs text-gray-400 self-center">{filtered.length} records</span>

        </div>
       
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