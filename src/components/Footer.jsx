import { Link } from 'react-router-dom'
import { FaXTwitter, FaInstagram, FaFacebook, FaWhatsapp, FaCalendar, FaClock, FaLocationPin, FaMessage } from 'react-icons/fa6'
import logo from '../assets/footer-logo.png'

const socials = [
  { icon: FaXTwitter, href: 'https://x.com/ogbomosotei', label: 'X' },
  { icon: FaInstagram, href: 'https://www.instagram.com/ogbomosotei', label: 'Instagram' },
  { icon: FaFacebook, href: 'https://www.facebook.com/profile.php?id=61575743913917', label: 'Facebook' },
  { icon: FaWhatsapp, href: 'https://chat.whatsapp.com/IV3NhSWZ1zTA3kXw5Q5JEy', label: 'WhatsApp' },
]

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white">
      <div className="max-w-7xl mx-auto px-5 md:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <img src={logo} alt="OTEI Logo" className="h-12 w-auto mb-4" />
            <p className="text-gray-500 text-xs leading-relaxed max-w-xs mb-6">
              A flagship innovation and business empowerment event creating a new wave of technology adoption, entrepreneurial thinking, and regulatory compliance in Ogbomoso.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 border border-gray-700 flex items-center justify-center text-gray-500 hover:border-brand-orange hover:text-brand-orange transition-colors duration-200">
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] tracking-widest uppercase text-brand-orange font-semibold mb-4">Participate</h4>
            {[
              { label: 'Register', to: '/register' },
              { label: 'Volunteer', to: '/volunteer' },
              { label: 'Sponsor', to: '/sponsor' },
              { label: 'Exhibition', to: '/exhibition' },
            ].map(l => (
              <Link key={l.label} to={l.to} className="block text-xs text-gray-500 hover:text-white mb-2.5 transition-colors">{l.label}</Link>
            ))}
          </div>

          {/* Event Info */}
          <div>
            <h4 className="text-[10px] tracking-widest uppercase text-brand-orange font-semibold mb-4">Event Info</h4>
            <div className="flex items-center gap-1 mb-2">
              <FaCalendar size={12} className="inline-block text-white mr-1" />
              <span className="text-xs text-gray-500">May 2, 2026</span>
            </div>

            <div className="flex items-center gap-1 mb-2">
              <FaClock size={12} className="inline-block text-white mr-1" />
              <span className="text-xs text-gray-500">10:00 AM</span>
            </div>
            <div className="flex items-center gap-1 mb-2">
              <FaLocationPin size={12} className="inline-block text-white mr-1" />
              <span className="text-xs text-gray-500">The Hall, LAUTECH, Ogbomoso</span>
            </div>
            <div className="flex items-center gap-1 mb-2">
              <FaMessage size={12} className="inline-block text-white mr-1" />
              <a href="mailto:info@ogbomosotei.com" className="text-xs text-gray-500 hover:text-white block mb-2 transition-colors">
                  info@ogbomosotei.com
              </a>
            </div>
            <a href="https://chat.whatsapp.com/IV3NhSWZ1zTA3kXw5Q5JEy" target="_blank" rel="noopener noreferrer"
              className="text-brand-orange hover:text-orange-400 block transition-colors mt-4">
              Join WhatsApp Community 
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[11px] text-gray-600">© {new Date().getFullYear()} Ogbomoso Tech & Entrepreneurship Ignite. All rights reserved.</p>
          <p className="text-[11px] text-gray-600">
            <a href="https://ogbomosotei.com" className="text-brand-orange hover:text-orange-400 transition-colors">ogbomosotei.com</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
