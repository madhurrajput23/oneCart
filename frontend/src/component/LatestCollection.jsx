import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function LatestCollection() {
  const { products } = useContext(shopDataContext)
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    setLatestProducts(products.slice(0, 8))
  }, [products])

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-[#141414] to-[#0c2025]">
      {/* Header */}
      <div className="text-center mb-2">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="text-blue-200/70 text-sm md:text-base max-w-xl mx-auto mt-1">
          Step Into Style – New Collection Dropping This Season!
        </p>
      </div>

      {/* Cards grid */}
      <div className="mt-10 flex flex-wrap justify-center gap-8">
        {latestProducts.map((item, index) => (
          <div
            key={index}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <Card name={item.name} image={item.image1} id={item._id} price={item.price} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default LatestCollection
