import React from 'react'
import back1 from "../assets/back1.jpg"
import back2 from "../assets/back2.jpg"
import back3 from "../assets/back3.jpg"
import back4 from "../assets/back4.jpg"

const images = [back2, back1, back3, back4]

function Backgound({ heroCount }) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000
            ${i === heroCount ? 'opacity-100 animate-bg-pan' : 'opacity-0'}`}
        />
      ))}
      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0c2025] to-transparent" />
    </div>
  )
}

export default Backgound
