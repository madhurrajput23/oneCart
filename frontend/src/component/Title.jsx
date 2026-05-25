import React from 'react'

function Title({ text1, text2 }) {
  return (
    <div className="inline-flex flex-col items-center gap-2 mb-4 animate-fade-in-up">
      <p className="text-4xl md:text-5xl font-bold tracking-tight">
        <span className="text-blue-100">{text1} </span>
        <span className="gradient-text">{text2}</span>
      </p>
      {/* Animated underline */}
      <div className="flex gap-1 items-center">
        <span className="block w-8 h-[3px] rounded-full bg-cyan-400" />
        <span className="block w-16 h-[3px] rounded-full" style={{background:'linear-gradient(90deg,#2dd4d4,#818cf8)'}} />
        <span className="block w-8 h-[3px] rounded-full bg-purple-400" />
      </div>
    </div>
  )
}

export default Title
