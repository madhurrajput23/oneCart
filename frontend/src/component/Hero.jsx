import React from 'react'
import { FaCircle } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'

function Hero({ heroData, heroCount, setHeroCount }) {
  const navigate = useNavigate()
  return (
    <div className="relative z-10 flex flex-col justify-center h-full pl-[6%] pt-[80px] lg:pt-[0px]">

      {/* Badge */}
      <div
        key={heroCount + '-badge'}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4
          bg-white/10 backdrop-blur-sm border border-white/20
          text-cyan-300 text-xs font-semibold w-fit animate-fade-in"
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        NEW COLLECTION
      </div>

      {/* Main headline */}
      <div key={heroCount + '-text'} className="animate-hero-slide">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white drop-shadow-lg">
          {heroData.text1}
        </h1>
        <p className="text-2xl md:text-3xl lg:text-4xl font-light text-cyan-300 mt-2">
          {heroData.text2}
        </p>
      </div>

      {/* CTA buttons */}
      <div key={heroCount + '-cta'} className="flex gap-4 mt-8 animate-fade-in-up delay-300">
        <button
          onClick={() => navigate('/collection')}
          className="px-6 py-3 rounded-xl font-semibold text-[15px] text-white
            bg-gradient-to-r from-cyan-500 to-indigo-600
            hover:from-cyan-400 hover:to-indigo-500
            shadow-lg shadow-cyan-500/30
            transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Shop Now →
        </button>
        <button
          onClick={() => navigate('/about')}
          className="px-6 py-3 rounded-xl font-semibold text-[15px] text-white
            glass border border-white/20
            hover:bg-white/15 transition-all duration-300 hover:scale-105"
        >
          Learn More
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-3 mt-10 animate-fade-in delay-500">
        {[0, 1, 2, 3].map(i => (
          <button
            key={i}
            onClick={() => setHeroCount(i)}
            className={`rounded-full transition-all duration-400 ${
              heroCount === i
                ? 'w-8 h-3 bg-cyan-400 shadow-md shadow-cyan-400/50'
                : 'w-3 h-3 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero
