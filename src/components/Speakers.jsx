import { useEffect, useRef } from "react";
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa6";

import Speaker1 from '../assets/speakers/dolapo.jpeg'
import Speaker2 from '../assets/speakers/ogunsina.jpeg'
import Speaker3 from '../assets/speakers/faith.jpeg'
import Speaker4 from '../assets/speakers/temitayo.jpeg'
import Speaker5 from '../assets/speakers/akintayo.jpeg'
import Speaker6 from '../assets/speakers/Oreoluwa.jpeg'

const speakersData = [
  {   
    name: "Faith Dolapo",
    title: "Product Manager",
    image: Speaker1,
    social:{
      linkedin: "https://www.linkedin.com/in/faith-dolapo-stephens-4aabb7187/",
      instagram: "https://www.instagram.com/faith_dolapo/",
    }
  },
  {   
    name: "Temidayo Mercy Ogunsina",
    title: "Corporate Banker",
    image: Speaker2,
  },
  {   
    name: "Faith Ogunsina",
    company:"Yoodaa",
    image: Speaker3,
    social:{
      facebook: "https://web.facebook.com/faith.ayotunde/",
      instagram: "https://www.instagram.com/papivalore/",
    }
  },
  {   
    name: "OSHO Temitayo Michael",
    title: "Digital Growth Strategist, Founder",
    company:"Creator Gigs Africa",
    image: Speaker4,
    social:{
      linkedin: "https://ng.linkedin.com/in/temitayo-michael-a91244198",
      facebook: "https://web.facebook.com/osho.temitayo.3/",
      instagram: "https://www.instagram.com/temitayo_is_marketing/",
    }
  },
  {   
    name: "Emmanuel Akintayo Alabi",
    title: "Finance Strategist, Co-founder",
    company:"Vehauction",
    image: Speaker5,
    social:{
      linkedin: "#",
      twitter: "#",
      facebook: "#",
      instagram: "#",
    }
  },
  {   
    name: "Yale Shola Oreoluwa",
    title: "Web3 Analyst, Writer",
    image: Speaker6,
    social:{
      facebook: "https://web.facebook.com/Oluwashola.Oreolwa/",
    }
  },
];

export function SpeakerSection() {
  const scrollRef = useRef(null);


  useEffect(() => {
  const container = scrollRef.current;

  const interval = setInterval(() => {
    if (!container) return;

    container.scrollBy({
      left: 300, // adjust based on card width
      behavior: "smooth",
    });

    // Loop back to start
    if (
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth - 10
    ) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, 3000); // every 3 seconds

  return () => clearInterval(interval);
}, []);

  return (
    <section id="speaker" className="bg-brand-black py-24 overflow-hidden">
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-tag">Our Speakers</span>
          <h2 className="section-title text-white">Meet the Lineup</h2>
        </div>

        {/* Scroll Container */}
        <div
  ref={scrollRef}
  className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
>
          
          {speakersData.map((speaker, index) => (
            <div
              key={index}
              className="min-w-[85%] sm:min-w-[45%] lg:min-w-[30%] snap-start"
            >
              <div className="group relative">

                {/* Card */}
                <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300">

                  {/* Image */}
                  <div className="relative h-80 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B2B] via-transparent to-transparent z-10"></div>
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 relative z-10">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {speaker.name}
                    </h3>

                    {speaker.title && (
                      <p className="text-sm text-[#FF4E00] font-semibold">
                        {speaker.title}
                      </p>
                    )}

                    {speaker.company && (
                      <p className="text-gray-400 uppercase tracking-wide mb-3">
                        {speaker.company}
                      </p>
                    )}

                    {/* Social Icons */}
                    <div className="flex gap-2 mt-3">
                      
                      {speaker.social?.linkedin && (
                        <a href={speaker.social.linkedin} target="_blank" rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF4E00] transition">
                          <FaLinkedin className="text-white" />
                        </a>
                      )}

                      {speaker.social?.twitter && (
                        <a href={speaker.social.twitter} target="_blank" rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF4E00] transition">
                          <FaTwitter className="text-white" />
                        </a>
                      )}

                      {speaker.social?.facebook && (
                        <a href={speaker.social.facebook} target="_blank" rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF4E00] transition">
                          <FaFacebook className="text-white" />
                        </a>
                      )}

                      {speaker.social?.instagram && (
                        <a href={speaker.social.instagram} target="_blank" rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF4E00] transition">
                          <FaInstagram className="text-white" />
                        </a>
                      )}

                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Optional: hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

    </section>
  );
}