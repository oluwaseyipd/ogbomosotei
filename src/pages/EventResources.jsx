import { HiArrowRight } from 'react-icons/hi'

const RESOURCES = [
  {
    title: 'Building a Bankable & Compliant Business',
    speaker: 'Emmanuel Alabi',
    description: 'Understanding how to structure and present your business for investor and bank readiness.',
    downloadUrl: 'https://docs.google.com/presentation/d/168mElJ7ZEcArM3OoZvuT0dQb8g7nRkwL/edit?slide=id.p1#slide=id.p1',
    tag: 'Finance'
  },
  {
    title: 'Brand Identity as a Growth Strategy',
    speaker: 'Faith Ogunsina',
    description: 'Building a strong and memorable brand that resonates with your target audience.',
    downloadUrl: 'https://docs.google.com/presentation/d/1oc6gjCIAn2QB_w3-Ye7hks5vtj4C9cv7/edit?slide=id.p1#slide=id.p1',
    tag: 'Branding'
  },
  {
    title: 'Formalizing Your Business with CAC',
    speaker: 'Oluwatobi Ojua',
    description: 'The importance of business registration, simplified procedures, legal and financial benefits, and common errors to avoid.',
    downloadUrl: 'https://docs.google.com/presentation/d/1XybLg4yib7CaX9PmqudindzjqxyJ3DmB/edit?slide=id.p1#slide=id.p1',
    tag: 'Compliance'
  },
  {
    title: 'Technology and Innovation',
    speaker: 'Favour Afolabi',
    description: 'How local ideas are shaping global possibilities in technology and entrepreneurship.',
    downloadUrl: 'https://docs.google.com/presentation/d/18rmLQhfMPwXr_1DDFFmrg1Tl9j3DdNCa-5h8oPRPn1k/edit?usp=sharing',
    tag: 'Innovation'
  },
  {
    title: 'SEO, Content Marketing & Visibility Strategies for African Businesses',
    speaker: 'Osho Temitayo Michael',
    description: 'Effective strategies for improving online visibility and driving organic traffic to your business.',
    downloadUrl: 'https://docs.google.com/presentation/d/1LJ7iF2p9imTobWUcjP_csUY376mXPswoExnUaDEmMuw/edit?slide=id.p#slide=id.p',
    tag: 'Marketing'
  },
//   {
//     title: 'Tax Compliance for Entrepreneurs',
//     speaker: 'Favour Afolabi',
//     description: 'Understanding tax obligations and compliance requirements for entrepreneurs.',
//     downloadUrl: '#',
//     tag: 'Finance'
//   },
]

export default function EventResources() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="bg-brand-black py-16 px-5 text-center border-b border-gray-100">
        <span className="text-[9px] tracking-widest uppercase text-brand-orange font-semibold">Learn & Grow</span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mt-3 mb-4">Event Resources</h1>
        <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed">
          Access speaker presentations, session materials, and key takeaways from Ogbomoso TEI 1.0. Download valuable insights to support your entrepreneurial journey.
        </p>
      </div>

      {/* Resources Grid */}
      <div className="py-20 px-5 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="section-tag">Conference Materials</span>
            <h2 className="section-title">Speaker Presentations & Materials</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5">
            {RESOURCES.map((resource, idx) => (
              <div key={idx} className="bg-white border border-gray-100 flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-200">
                {/* Tag */}
                <div className="w-full ">
                  <span className="inline-block m-4 text-[9px] tracking-widest uppercase p-2 font-semibold bg-brand-orange/10 text-brand-orange">
                    {resource.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-semibold text-brand-black text-lg leading-snug mb-3">
                    {resource.title}
                  </h3>
                  <p className="text-[11px] font-semibold tracking-widest uppercase text-brand-orange mb-3">
                    {resource.speaker}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed mb-6 flex-1">
                    {resource.description}
                  </p>
                  
                  {/* Download Button */}
                  <a
                    href={resource.downloadUrl}
                    className="w-full flex items-center justify-center gap-2 p-3 bg-brand-black hover:bg-brand-black/90 text-xs font-semibold text-brand-orange hover:text-orange-600 transition-colors duration-200 group"
                  >
                    <span>Access Material</span>
                    <HiArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {/* <section className="bg-gray-50 border-t border-gray-100 py-16 px-5 mt-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-black mb-4">
            Want to Stay Updated?
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-8">
            Subscribe to our newsletter to receive updates on future events, exclusive resources, and opportunities to grow your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Enter your email address"
              className="input-field max-w-xs"
            />
            <button className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section> */}
    </div>
  )
}