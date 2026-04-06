import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { HiOutlineRefresh, HiOutlineLogout } from 'react-icons/hi'
import logo from '../assets/footer-logo.png'

// Import the new split components
import RegistrationsTab from '../components/dashboard/RegistrationsTab'
import VolunteersTab from '../components/dashboard/VolunteersTab'
import SponsorsTab from '../components/dashboard/SponsorsTab'
import ExhibitorsTab from '../components/dashboard/ExhibitorsTab'


const TABLES = ['registrations', 'volunteers', 'sponsors', 'exhibitors']

// Helper internal to the dashboard shell
function StatCard({ label, value, sub }) {
  return (
    <div className="bg-white border border-gray-100 p-5">
      <div className="text-[10px] tracking-widest uppercase text-gray-400 font-medium mb-1">{label}</div>
      <div className="font-serif text-4xl font-bold text-brand-black">{value}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </div>
  )
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState('registrations')
  const [allData, setAllData] = useState({ registrations: [], volunteers: [], sponsors: [], exhibitors: [], newsletter_subscribers: [] })
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    try {
      const results = await Promise.all(
        TABLES.map(t => supabase.from(t).select('*').order('created_at', { ascending: false }))
      )
      const newData = {}
      TABLES.forEach((t, i) => { newData[t] = results[i].data || [] })
      setAllData(newData)
      setLastRefresh(new Date())
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  const handleLogout = async () => {
  await supabase.auth.signOut()
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
          <img src={logo} alt="OTEI Logo" className="h-8" />
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

        {/* Tabs Navigation */}
        <div className="flex gap-0.5 mb-6 border-b border-gray-200">
          {tabs.map(t => (
            <button 
              key={t.key} 
              onClick={() => setActiveTab(t.key)}
              className={`px-5 py-3 text-xs font-semibold tracking-wide transition-colors duration-150 relative ${
                activeTab === t.key
                  ? 'text-brand-orange border-b-2 border-brand-orange -mb-px'
                  : 'text-gray-400 hover:text-brand-black'
              }`}
            >
              {t.label}
              <span className={`ml-2 px-1.5 py-0.5 text-[10px] font-bold rounded-sm ${activeTab === t.key ? 'bg-orange-50 text-brand-orange' : 'bg-gray-100 text-gray-400'}`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* Dynamic Tab Content */}
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