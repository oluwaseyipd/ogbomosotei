import { Link } from 'react-router-dom'
import { FaXTwitter, FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa6'
import logo from '../assets/footer-logo.png'
import { useCountdown } from '../hooks/useCountdown'

const socials = [
  { icon: FaXTwitter, href: 'https://x.com/ogbomosotei', label: 'X' },
  { icon: FaInstagram, href: 'https://www.instagram.com/ogbomosotei', label: 'Instagram' },
  { icon: FaFacebook, href: 'https://www.facebook.com/profile.php?id=61575743913917', label: 'Facebook' },
  { icon: FaWhatsapp, href: 'https://chat.whatsapp.com/IV3NhSWZ1zTA3kXw5Q5JEy', label: 'WhatsApp' },
]


function CountdownBlock({ value, label }) {
  const display = String(value).padStart(2, '0')
  return (
    <div className=" w-16 h-17 p-3 text-center flex-1">
      <div className="font-serif text-2xl md:text-3xl font-bold text-white leading-none">{display}</div>
      <div className="text-[9px] tracking-widest uppercase text-brand-orange mt-2 font-medium">{label}</div>
    </div>
  )
}

export default function Footer() {
  const { days, hours, minutes, seconds } = useCountdown()
  return (
    <footer className="bg-brand-black text-white">
      <div className="max-w-7xl mx-auto px-5 md:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="">
            <img src={logo} alt="OTEI Logo" className="h-12 w-auto mb-4" />
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-6">
              A flagship innovation and business empowerment event creating a new wave of technology adoption, entrepreneurial thinking, and regulatory compliance in Ogbomoso.
            </p>
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

          {/* Social Links */}
          <div>
             <h4 className="text-[10px] tracking-widest uppercase text-brand-orange font-semibold mb-4">Connect With Us</h4>

            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 border border-gray-700 bg-gray-800 flex items-center justify-center text-white hover:border-brand-orange hover:text-brand-orange transition-colors duration-200">
                  <Icon size={13} />
                </a>
              ))}
            </div>
            <div className="mt-6">
              <p className='text-brand-orange'>
                Email:
                <a href="mailto:ogbomosotei@gmail.com" className="text-gray-500 hover:text-white ml-1 transition-colors">
                  ogbomosotei@gmail.com
                </a>
              </p>

              <p className='text-brand-orange mt-2'>
                Phone:
                <a href="tel:+2348140180989" className="text-gray-500 hover:text-white ml-1 transition-colors">
                 +234 814 018 0989
                </a>
              </p>
            </div>
          </div>

          {/* Event Info */}
          <div>
            <h4 className="text-[10px] tracking-widest uppercase text-brand-orange font-semibold mb-4">Event Info</h4>
            <div className="flex items-center gap-1 mb-2">
              <span className="text-sm font-bold text-white">May 2, 2026</span>
            </div>

            <div className="flex items-center gap-1 mb-2">
              <span className="text-sm text-gray-400">10:00 AM</span>
            </div>
            <div className="flex items-center gap-1 mb-2">
              <span className="text-sm text-gray-400">The Hall, LAUTECH, Ogbomoso</span>
            </div>

            <div className="flex flex-col mb-10">     
               <div className="bg-gray-900/50 flex gap-0.5 w-full border-2 border-brand-orange rounded-lg max-w-sm">
                 <CountdownBlock value={days} label="Days" />
                 <CountdownBlock value={hours} label="Hours" />
                 <CountdownBlock value={minutes} label="Mins" />
                 <CountdownBlock value={seconds} label="Secs" />
               </div>
             </div>
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
