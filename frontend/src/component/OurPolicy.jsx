import React from 'react'
import Title from './Title'
import { RiExchangeFundsLine } from "react-icons/ri"
import { TbRosetteDiscountCheckFilled } from "react-icons/tb"
import { BiSupport } from "react-icons/bi"

const policies = [
  {
    icon: RiExchangeFundsLine,
    title: 'Easy Exchange Policy',
    desc: 'Exchange Made Easy – Quick, Simple, and Customer-Friendly Process.',
    color: 'from-cyan-500/20 to-cyan-500/5',
    iconColor: 'text-cyan-400',
    delay: '0s',
  },
  {
    icon: TbRosetteDiscountCheckFilled,
    title: '7 Days Return Policy',
    desc: 'Shop with Confidence – 7 Days Easy Return Guarantee.',
    color: 'from-indigo-500/20 to-indigo-500/5',
    iconColor: 'text-indigo-400',
    delay: '0.15s',
  },
  {
    icon: BiSupport,
    title: 'Best Customer Support',
    desc: 'Trusted Support – Your Satisfaction Is Our Priority.',
    color: 'from-purple-500/20 to-purple-500/5',
    iconColor: 'text-purple-400',
    delay: '0.3s',
  },
]

function OurPolicy() {
  return (
    <div className="py-20 px-4 bg-gradient-to-b from-[#0c2025] to-[#0a1a1f]">
      <div className="text-center mb-12">
        <Title text1="OUR" text2="POLICY" />
        <p className="text-blue-200/70 text-sm md:text-base max-w-xl mx-auto mt-1">
          Customer-Friendly Policies – Committed to Your Satisfaction and Safety.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
        {policies.map(({ icon: Icon, title, desc, color, iconColor, delay }, i) => (
          <div
            key={i}
            className={`w-[320px] max-w-[90vw] rounded-2xl p-7 flex flex-col items-center text-center
              bg-gradient-to-b ${color} glass hover-lift border border-white/10
              animate-fade-in-up`}
            style={{ animationDelay: delay }}
          >
            {/* Icon circle */}
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4
              bg-white/5 border border-white/10 ${iconColor} animate-float`}
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              <Icon className="w-8 h-8" />
            </div>
            <p className="text-white font-bold text-xl mb-2">{title}</p>
            <p className="text-blue-200/70 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OurPolicy
