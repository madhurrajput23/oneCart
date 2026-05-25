import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function BestSeller() {
  const { products } = useContext(shopDataContext)
  const [bestSeller, setBestSeller] = useState([])

  useEffect(() => {
    const filtered = products.filter(item => item.bestseller)
    setBestSeller(filtered.slice(0, 4))
  }, [products])

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-[#0c2025] to-[#141414]">
      {/* Header */}
      <div className="text-center mb-2">
        <Title text1="BEST" text2="SELLERS" />
        <p className="text-blue-200/70 text-sm md:text-base max-w-xl mx-auto mt-1">
          Tried, Tested, Loved – Discover Our All-Time Best Sellers.
        </p>
      </div>

      {/* Cards grid */}
      <div className="mt-10 flex flex-wrap justify-center gap-8">
        {bestSeller.map((item, index) => (
          <div
            key={index}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Card name={item.name} id={item._id} price={item.price} image={item.image1} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BestSeller
