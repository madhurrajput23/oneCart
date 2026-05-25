import React, { useEffect, useState } from 'react'
import Backgound from '../component/Backgound'
import Hero from '../component/Hero'
import Product from './Product'
import OurPolicy from '../component/OurPolicy'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'

function Home() {
  const heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style That Speaks" },
    { text1: "Discover Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Picks", text2: "Shop Now!" },
    { text1: "Your Perfect Fashion Fit", text2: "Now on Sale!" },
  ]

  const [heroCount, setHeroCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount(prev => (prev === 3 ? 0 : prev + 1))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="overflow-x-hidden relative top-[70px]">
      {/* Hero Section */}
      <div className="relative w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025]">
        <Backgound heroCount={heroCount} />
        <div className="relative z-10 w-full h-full">
          <Hero heroCount={heroCount} setHeroCount={setHeroCount} heroData={heroData[heroCount]} />
        </div>
      </div>

      {/* Sections */}
      <Product />
      <OurPolicy />
      <NewLetterBox />
      <Footer />
    </div>
  )
}

export default Home
