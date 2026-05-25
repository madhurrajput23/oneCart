import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { FaStar, FaStarHalfAlt } from "react-icons/fa"
import { MdVerified, MdLocalShipping, MdLoop } from 'react-icons/md'
import RelatedProduct from '../component/RelatedProduct'
import Loading from '../component/Loading'

function ProductDetail() {
  const { productId } = useParams()
  const { products, currency, addtoCart, loading } = useContext(shopDataContext)
  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [images, setImages] = useState([])
  const [size, setSize] = useState('')
  const [addedAnimation, setAddedAnimation] = useState(false)

  useEffect(() => {
    const found = products.find(item => item._id === productId)
    if (found) {
      setProductData(found)
      const imgs = [found.image1, found.image2, found.image3, found.image4].filter(Boolean)
      setImages(imgs)
      setImage(imgs[0])
    }
  }, [productId, products])

  const handleAddToCart = () => {
    addtoCart(productData._id, size)
    if (size) {
      setAddedAnimation(true)
      setTimeout(() => setAddedAnimation(false), 1500)
    }
  }

  if (!productData) return <div className="opacity-0" />

  return (
    <div className="min-h-screen pt-[70px] pb-[80px] md:pb-0
      bg-gradient-to-b from-[#0c2025] via-[#141414] to-[#0a1a20]">

      {/* ── Product section ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-10 py-10
        flex flex-col lg:flex-row gap-10 items-start">

        {/* Left: Images */}
        <div className="w-full lg:w-1/2 flex flex-col-reverse lg:flex-row gap-4 animate-slide-left">
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto
            lg:max-h-[500px] pb-2 lg:pb-0 lg:pr-2 flex-shrink-0">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setImage(src)}
                className={`flex-shrink-0 w-[70px] h-[70px] rounded-xl overflow-hidden
                  border-2 transition-all duration-300
                  ${image === src ? 'border-cyan-400 scale-105' : 'border-white/10 hover:border-white/30'}`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="flex-1 rounded-2xl overflow-hidden border border-white/10 relative group
            max-h-[500px]">
            <img
              src={image}
              alt={productData.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Zoom hint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100
              bg-black/20 transition-opacity duration-300 text-white/70 text-sm font-medium">
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="w-full lg:w-1/2 animate-slide-right">
          {/* Name */}
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
            {productData.name}
          </h1>

          {/* Stars */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(4)].map((_, i) => <FaStar key={i} className="text-yellow-400 text-[18px]" />)}
            <FaStarHalfAlt className="text-yellow-400 text-[18px]" />
            <span className="text-white/50 text-sm ml-2">(124 reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-4xl font-extrabold text-cyan-300">
              {currency}{productData.price}
            </span>
            <span className="text-white/30 line-through text-xl">
              {currency}{Math.round(productData.price * 1.3)}
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold
              bg-green-500/20 text-green-400 border border-green-500/30">
              30% OFF
            </span>
          </div>

          {/* Description */}
          <p className="text-white/60 text-[15px] leading-relaxed mb-6">
            {productData.description} Stylish, breathable cotton shirt with a modern slim fit.
            Easy to wash, super comfortable, and designed for effortless style.
          </p>

          {/* Divider */}
          <div className="w-full h-px bg-white/10 mb-6" />

          {/* Size selector */}
          <div className="mb-6">
            <p className="text-white font-semibold text-[15px] mb-3">Select Size</p>
            <div className="flex flex-wrap gap-3">
              {productData.sizes.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSize(s)}
                  className={`w-12 h-12 rounded-xl font-bold text-sm transition-all duration-200
                    ${s === size
                      ? 'bg-gradient-to-br from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/30 scale-110'
                      : 'glass border border-white/15 text-white/60 hover:border-cyan-400/40 hover:text-white'
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className={`w-full md:w-auto px-10 py-4 rounded-xl font-bold text-[15px] text-white
              transition-all duration-300
              ${addedAnimation
                ? 'bg-green-500 scale-95'
                : 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 hover:scale-[1.02] shadow-lg shadow-cyan-500/30'
              }`}
          >
            {loading ? <Loading /> : addedAnimation ? '✓ Added to Cart!' : '🛒 Add to Cart'}
          </button>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 mt-8">
            {[
              { icon: MdVerified,      label: '100% Original' },
              { icon: MdLocalShipping, label: 'Cash on Delivery' },
              { icon: MdLoop,          label: '7-Day Returns' },
            ].map(({ icon: Icon, label }, i) => (
              <div key={i}
                className="flex flex-col items-center gap-1 p-3 rounded-xl glass border border-white/10 text-center">
                <Icon className="w-5 h-5 text-cyan-400" />
                <span className="text-white/50 text-[11px] font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Description tab ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-10 pb-10">
        <div className="flex gap-2 mb-4">
          {['Description', 'Reviews (124)'].map((tab, i) => (
            <button key={i}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all
                ${i === 0
                  ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-400/30'
                  : 'glass border border-white/10 text-white/40 hover:text-white/60'
                }`}
            >{tab}</button>
          ))}
        </div>

        <div className="glass border border-white/10 rounded-2xl p-6 text-white/60 text-[15px] leading-relaxed">
          Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on OneCart.
          Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style.
          Easy to maintain and perfect for any setting, this shirt is a must-have essential for those
          who value both fashion and function.
        </div>
      </div>

      {/* ── Related Products ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-10 pb-16">
        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
          currentProductId={productData._id}
        />
      </div>
    </div>
  )
}

export default ProductDetail
