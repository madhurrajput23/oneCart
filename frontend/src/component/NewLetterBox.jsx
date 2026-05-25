import React, { useState } from 'react'
import { toast } from 'react-toastify'

function NewLetterBox() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      toast.success('🎉 Subscribed! Check your inbox for your 20% off code.')
      setEmail('')
      setTimeout(() => setSubmitted(false), 4000)
    }
  }

  return (
    <div className="py-20 px-4 bg-gradient-to-br from-[#0a1a1f] via-[#0d2030] to-[#141414] relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-60px] left-[-60px] w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full bg-indigo-500/10 blur-[80px] pointer-events-none" />

      <div className="relative max-w-2xl mx-auto text-center animate-fade-in-up">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6
          bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-400/30
          text-cyan-300 text-xs font-semibold"
        >
          🎁 LIMITED OFFER
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
          Subscribe &amp; Get{' '}
          <span className="gradient-text">20% OFF</span>
        </h2>
        <p className="text-blue-200/70 text-sm md:text-base mb-8">
          Subscribe for exclusive savings, special deals, and early access to new collections.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            required
            placeholder="Enter your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1 max-w-sm px-5 py-3 rounded-xl text-white placeholder-white/40
              glass border border-white/15 outline-none focus:border-cyan-400/60
              transition-colors duration-300 text-sm"
          />
          <button
            type="submit"
            className="px-7 py-3 rounded-xl font-semibold text-white text-sm
              bg-gradient-to-r from-cyan-500 to-indigo-600
              hover:from-cyan-400 hover:to-indigo-500
              shadow-lg shadow-cyan-500/30
              transition-all duration-300 hover:scale-105 active:scale-95
              whitespace-nowrap"
          >
            {submitted ? '✓ Subscribed!' : 'Subscribe Now'}
          </button>
        </form>

        <p className="text-white/30 text-xs mt-4">No spam. Unsubscribe anytime.</p>
      </div>
    </div>
  )
}

export default NewLetterBox
