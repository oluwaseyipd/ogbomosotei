import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { HiOutlineDownload } from 'react-icons/hi'
import { downloadCSV, fmt, ORANGE } from '../../utils/adminHelpers'


export default function NewsletterTab({ data, loading }) {
  const [search, setSearch] = useState('')
  const filtered = data.filter(r =>
    !search || `${r.first_name} ${r.last_name} ${r.email} ${r.source}`.toLowerCase().includes(search.toLowerCase())
  )

  const sourceCount = {}
  data.forEach(r => { sourceCount[r.source] = (sourceCount[r.source] || 0) + 1 })


  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5 mb-6">
        {Object.entries(sourceCount).map(([source, count]) => (
          <div key={source} className="bg-white border border-gray-100 p-4 text-center">
            <div className="font-serif text-3xl font-bold text-brand-black">{count}</div>
            <div className="text-[10px] tracking-widest uppercase text-gray-400 mt-1 capitalize">{source}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          className="input-field max-w-xs text-sm py-2"
          placeholder="Search name, email, source..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className='flex gap-3'>
<button
          onClick={() => downloadCSV(filtered, 'otei_newsletter.csv')}
          className="flex items-center gap-1.5 text-xs font-medium border border-gray-200 px-4 py-2 hover:border-brand-orange hover:text-brand-orange transition-colors">
          <HiOutlineDownload size={14} /> Export CSV
        </button>
        <span className="text-xs text-gray-400 self-center">{filtered.length} subscribers</span>
        </div>
        
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {['First Name', 'Last Name', 'Email', 'Source', 'Subscribed'].map(h => (
                <th key={h} className="text-left px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wide text-[10px] whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="text-center py-10 text-gray-400 text-sm">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-10 text-gray-400 text-sm">No subscribers yet.</td></tr>
            ) : filtered.map(r => (
              <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-3 py-2.5 font-medium text-brand-black">{r.first_name}</td>
                <td className="px-3 py-2.5 text-gray-600">{r.last_name}</td>
                <td className="px-3 py-2.5 text-gray-500">{r.email}</td>
                <td className="px-3 py-2.5">
                  <span className="px-2 py-0.5 bg-orange-50 text-brand-orange text-[9px] font-semibold uppercase tracking-wide">
                    {r.source}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-gray-400 whitespace-nowrap">{fmt(r.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}