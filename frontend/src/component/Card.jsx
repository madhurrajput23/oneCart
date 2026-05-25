import React, { useState } from 'react'
import { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'

function Card({ name, image, id, price }) {
  const { currency } = useContext(shopDataContext)
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="w-[280px] max-w-[90vw] group cursor-pointer hover-lift animate-fade-in-up"
      onClick={() => navigate(`/productdetail/${id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div className="relative w-full h-[320px] rounded-2xl overflow-hidden glass border border-white/10">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Quick view badge */}
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-semibold text-white
            bg-gradient-to-r from-cyan-500 to-indigo-500 shadow-lg
            translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
            transition-all duration-400"
        >
          View Details →
        </div>

        {/* Best seller tag (random visual) */}
        <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-[10px] font-bold text-black bg-gradient-to-r from-yellow-300 to-orange-400">
          ★ TOP PICK
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 px-1">
        <p className="text-[#c3f6fa] font-semibold text-[15px] truncate">{name}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-white font-bold text-[17px]">{currency}{price}</p>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_,i) => (
              <FaStar key={i} className={`text-[10px] ${i < 4 ? 'text-yellow-400' : 'text-gray-600'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
