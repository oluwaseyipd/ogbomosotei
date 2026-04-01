import { Link } from 'react-router-dom'
import { useCountdown } from '../hooks/useCountdown'
import { FaWhatsapp } from 'react-icons/fa6'
import herobg from '../assets/hero.png'


function CountdownBlock({ value, label }) {
  const display = String(value).padStart(2, '0')
  return (
    <div className="bg-gray-900/50 w-16 h-17 p-3 text-center flex-1">
      <div className="font-serif text-2xl md:text-3xl font-bold text-white leading-none">{display}</div>
      <div className="text-[9px] tracking-widest uppercase text-brand-orange mt-2 font-medium">{label}</div>
    </div>
  )
}
 
 export default function HeroSection() {
      const { days, hours, minutes, seconds } = useCountdown()
    
   return (
          <section className="relative min-h-[89vh] border-b border-gray-100"  
            style={{ backgroundImage: `url(${herobg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            {/* overlay */}
            <div className="absolute inset-0 bg-slate-900 bg-opacity-70" />
            <div className='max-w-7xl mx-auto relative z-10'>
             <div className="flex flex-col justify-center px-8 md:px-14 py-16 md:py-24 md:max-w-4xl">
               <div className="flex items-center gap-2 mb-7">
                 <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                 <span className="text-[10px] tracking-widest uppercase text-white font-medium">Inaugural Edition — Ogbomoso, Nigeria</span>
               </div>
     
               <h1 className="font-serif text-5xl md:text-6xl font-black text-white leading-[1.05] mb-6">
                 Vision to
                 <span className="text-brand-orange"> Value.</span><br />
                 Building a Structured, Bankable and Scalable Enterprise
               </h1>
     
               <div className="flex gap-8 mb-10 bg-black/30 w-max px-6 py-4">
                 {[
                   { label: 'Date', value: 'May 2, 2026' },
                   { label: 'Time', value: '10:00 AM' },
                   { label: 'Venue', value: 'The Hall LAUTECH, Ogbomoso' },
                 ].map(m => (
                   <div key={m.label}>
                     <div className="text-[9px] tracking-widest uppercase text-brand-orange font-medium mb-1">{m.label}</div>
                     <div className="text-sm font-semibold text-white">{m.value}</div>
                   </div>
                 ))}
               </div>

               <div className="flex flex-col mb-10">     
               <div className="flex gap-0.5 w-full max-w-sm">
                 <CountdownBlock value={days} label="Days" />
                 <CountdownBlock value={hours} label="Hours" />
                 <CountdownBlock value={minutes} label="Mins" />
                 <CountdownBlock value={seconds} label="Secs" />
               </div>
             </div>
     
               <div className="flex flex-wrap gap-3">
                 <Link to="/register" className="btn-primary">Register for Free</Link>
                 <Link to="/sponsor" className="btn-outline text-white hover:border-brand-orange">Become a Sponsor</Link>
               </div>
             </div>
             </div>
           </section>
   )
 }
 