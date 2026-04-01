// import { motion } from "motion/react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight, FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa6";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
        title: "Finance Strategist,Co-founder",
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
        name: "Yale Shola Oreoluwa ",
        title: "Web3 Analyst, Writer",
        image: Speaker6,
        social:{
            facebook: "https://web.facebook.com/Oluwashola.Oreolwa/",
        }
    },

]


// Custom Arrow Components
function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute -right-4 lg:-right-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-r from-[#FF4E00] to-[#E31B23] flex items-center justify-center shadow-[0_0_20px_rgba(255,78,0,0.5)] hover:shadow-[0_0_30px_rgba(255,78,0,0.8)] transition-all"
    >
      <FaChevronRight className="w-6 h-6 text-white" />
    </button>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute -left-4 lg:-left-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-r from-[#FF4E00] to-[#E31B23] flex items-center justify-center shadow-[0_0_20px_rgba(255,78,0,0.5)] hover:shadow-[0_0_30px_rgba(255,78,0,0.8)] transition-all"
    >
      <FaChevronLeft className="w-6 h-6 text-white" />
    </button>
  );
}

export function SpeakerSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 2,
    },
  },
  {
    breakpoint: 768,  // changed from 640
    settings: {
      slidesToShow: 1,
      arrows: false,  // hide arrows on mobile to avoid overflow
    },
  },
],
  };

  function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="hidden md:flex absolute -right-4 lg:-right-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-r from-[#FF4E00] to-[#E31B23] items-center justify-center shadow-[0_0_20px_rgba(255,78,0,0.5)] hover:shadow-[0_0_30px_rgba(255,78,0,0.8)] transition-all"
    >
      <FaChevronRight className="w-6 h-6 text-white" />
    </button>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="hidden md:flex absolute -left-4 lg:-left-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-r from-[#FF4E00] to-[#E31B23] items-center justify-center shadow-[0_0_20px_rgba(255,78,0,0.5)] hover:shadow-[0_0_30px_rgba(255,78,0,0.8)] transition-all"
    >
      <FaChevronLeft className="w-6 h-6 text-white" />
    </button>
  );
}

  return (
    <section id="speaker" className="relative bg-brand-black py-24 overflow-hidden">

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        
        <div className="text-center mb-16">
           <div className="mb-12">
                <span className="section-tag">Our Speakers</span>
                <h2 className="section-title text-white">Meet the Lineup</h2>
            </div>
        </div>

        <div className="relative px-4 lg:px-16">
          <Slider {...settings}>
            {speakersData.map((speaker, index) => (
              <div key={index} className="px-4">
                <div
                  className="group relative"
                >
                  {/* Speaker Card */}
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
                      <p className="text-sm text-[#FF4E00] font-semibold">
                        {speaker.title}
                      </p>
                      <p className="text-gray-400 uppercase tracking-wide mb-3">
                        {speaker.company}
                      </p>

                     {/* Social Icons */}
<div className="flex gap-2">
  
  {speaker.social?.linkedin && (
    <a
      href={speaker.social.linkedin}
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[#FF4E00] transition-all"
    >
      <FaLinkedin className="w-5 h-5 text-white" />
    </a>
  )}

  {speaker.social?.twitter && (
    <a
      href={speaker.social.twitter}
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[#FF4E00] transition-all"
    >
      <FaTwitter className="w-5 h-5 text-white" />
    </a>
  )}

  {speaker.social?.facebook && (
    <a
      href={speaker.social.facebook}
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[#FF4E00] transition-all"
    >
      <FaFacebook className="w-5 h-5 text-white" />
    </a>
  )}

  {speaker.social?.instagram && (
    <a
      href={speaker.social.instagram}
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[#FF4E00] transition-all"
    >
      <FaInstagram className="w-5 h-5 text-white" />
    </a>
  )}
  
</div>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

     <style>{`
  .slick-dots {
    bottom: -50px;
  }
  .slick-dots li button:before {
    color: rgba(255, 255, 255, 0.3);
    font-size: 10px;
  }
  .slick-dots li.slick-active button:before {
    color: #FF4E00;
  }
  @media (max-width: 768px) {
    .slick-slide {
      padding: 0 4px;
    }
  }
`}</style>
    </section>
  );
}
