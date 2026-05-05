import { RxCross2 } from 'react-icons/rx'

export default function NotificationModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="notification-title"
        aria-describedby="notification-desc"
        className="relative w-full max-w-[500px] overflow-hidden bg-white shadow-3xl"
      >
        <div className="absolute top-4 right-4 z-10">
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-900 text-white transition hover:bg-brand-orange hover:text-white"
            aria-label="Close notification"
          >
            <RxCross2 size={18} />
          </button>
        </div>

        <div className="relative px-8 py-10 text-white sm:px-10 sm:py-12">
          <div className="inline-flex bg-brand-orange/15 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-orange">
            Event Update
          </div>
          <h2 id="notification-title" className="mt-6 text-3xl font-serif font-bold leading-tight text-brand-black">
            Ogbomoso TEI 1.0 was a Success!
          </h2>
          <p id="notification-desc" className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-700">
            Thank you to everyone who joined and supported our launch event. Your energy made this edition unforgettable, and we're excited to keep the momentum going.
          </p>
        </div>

        <div className="space-y-6 px-8 pb-10 sm:px-10">
          <p className="bg-orange-50 backdrop-blur-sm p-4 rounded-lg text-sm text-brand-orange leading-relaxed">
            Access conference highlights, speaker resources, and photos in one place. Stay connected with the OTEI community for news on future programs.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href="https://drive.google.com/drive/folders/12_Z1R-6m78RoO71e0x5z0z-y-9voZTRB?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-brand-orange px-6 py-2 text-sm font-semibold text-white transition hover:bg-orange-500"
            >
              Event Pictures
            </a>
            <a
              href="/event-resources"
              className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-6 py-2 text-sm font-semibold text-slate-100 transition hover:border-brand-orange hover:text-brand-orange"
            >
              Speaker Resources
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
