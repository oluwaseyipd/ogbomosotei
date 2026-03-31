import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx'
import logo from '../assets/logo.png'

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Schedule', href: '/#schedule' },
  { label: 'Speakers', href: '/#speakers' },
  { label: 'Sponsor', href: '/sponsor' },
  { label: 'Exhibition', href: '/exhibition' },
  { label: 'Volunteer', href: '/volunteer' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-sm' : ''} border-b border-gray-100`}>
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none">
          <img src={logo} alt="OTEI Logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(l => (
            <a key={l.label} href={l.href}
              className="text-[13px] text-gray-500 hover:text-brand-orange transition-colors duration-150 font-normal tracking-wide">
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Link to="/register" className="btn-primary text-[13px] py-2.5 px-6">
            Register Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-brand-black" onClick={() => setOpen(!open)}>
          {open ? <RxCross2 size={22} /> : <RxHamburgerMenu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-5 py-6 flex flex-col gap-4">
          {navLinks.map(l => (
            <a key={l.label} href={l.href}
              className="text-sm text-gray-600 hover:text-brand-orange font-medium py-1">
              {l.label}
            </a>
          ))}
          <Link to="/register" className="btn-primary text-center text-sm mt-2">
            Register Now
          </Link>
        </div>
      )}
    </header>
  )
}
