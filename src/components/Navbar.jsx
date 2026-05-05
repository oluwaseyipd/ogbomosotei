import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx'
import logo from '../assets/logo.png'

const navLinks = [
  { label: 'About', href: '/#about', hash: '#about' },
  { label: 'Schedule', href: '/#schedule', hash: '#schedule' },
  { label: 'Speakers', href: '/#speakers', hash: '#speakers' },
  { label: 'Sponsor', href: '/sponsor', hash: null },
  { label: 'Exhibition', href: '/exhibition', hash: null },
  { label: 'Volunteer', href: '/volunteer', hash: null },
  { label: 'Event Resources', href: '/event-resources', hash: null },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeHash, setActiveHash] = useState('')
  const location = useLocation()

  // 1. Handle background shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 2. Handle Active Hash on Scroll & Click (for About, Schedule, Speakers)
  useEffect(() => {
    // Only run this on the homepage
    if (location.pathname !== '/') {
      setActiveHash('')
      return
    }

    const handleScroll = () => {
      // Find the sections by their IDs
      const sections = ['about', 'schedule', 'speakers']
        .map(id => document.getElementById(id))
        .filter(Boolean)

      let currentActive = ''
      
      // Look through sections to see which one is currently in view
      // We subtract 100 pixels to account for the sticky navbar height
      for (const section of sections) {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentActive = `#${section.id}`
          break
        }
      }

      setActiveHash(currentActive)
    }

    window.addEventListener('scroll', handleScroll)
    // Run once on mount in case the page is already scrolled down
    handleScroll() 

    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  useEffect(() => setOpen(false), [location])

  // Helper function to check if a link is active
  const isLinkActive = (link) => {
    if (link.hash) {
      return location.pathname === '/' && activeHash === link.hash
    }
    return location.pathname === link.href
  }

  // Smooth scroll handler for anchor links
  const handleNavClick = (e, link) => {
    if (link.hash && location.pathname === '/') {
      e.preventDefault()
      const targetElement = document.getElementById(link.hash.substring(1))
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 64, // 64px is the height of your navbar (h-16)
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-sm' : ''} border-b border-gray-100`}>
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none">
          <img src={logo} alt="OTEI Logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(l => {
            const active = isLinkActive(l)
            return (
              <a 
                key={l.label} 
                href={l.href}
                onClick={(e) => handleNavClick(e, l)}
                className={`text-[13px] transition-colors duration-150 tracking-wide hover:text-brand-orange ${
                  active ? 'text-brand-orange font-medium' : 'text-gray-500 font-normal'
                }`}
              >
                {l.label}
              </a>
            )
          })}
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
          {navLinks.map(l => {
            const active = isLinkActive(l)
            return (
              <a 
                key={l.label} 
                href={l.href}
                onClick={(e) => handleNavClick(e, l)}
                className={`text-sm hover:text-brand-orange py-1 ${
                  active ? 'text-brand-orange font-semibold' : 'text-gray-600 font-medium'
                }`}
              >
                {l.label}
              </a>
            )
          })}
          <Link to="/register" className="btn-primary text-center text-sm mt-2">
            Register Now
          </Link>
        </div>
      )}
    </header>
  )
}
