import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Register from './pages/Register'
import Volunteer from './pages/Volunteer'
import Sponsor from './pages/Sponsor'
import Exhibition from './pages/Exhibition'
import EventResources from './pages/EventResources'
import Admin from './pages/Admin'
import AdminGuard from './components/AdminGuard'

export default function App() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{
        style: { borderRadius: 0, fontFamily: 'DM Sans, sans-serif', fontSize: '14px' },
        success: { iconTheme: { primary: '#F97316', secondary: '#fff' } },
      }} />
      <Routes>
        {/* Admin route — no Navbar/Footer */}
        <Route path="/admin" element={
          <AdminGuard>
            <Admin />
          </AdminGuard>
        } />

        {/* Public routes */}
        <Route path="/*" element={
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/volunteer" element={<Volunteer />} />
                <Route path="/sponsor" element={<Sponsor />} />
                <Route path="/exhibition" element={<Exhibition />} />
                <Route path="/event-resources" element={<EventResources />} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </>
  )
}
