import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri"
import CartTotal from '../component/CartTotal'
import { MdOutlineShoppingCart } from 'react-icons/md'

function Cart() {
  const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext)
  const [cartData, setCartData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const tempData = []
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({ _id: items, size: item, quantity: cartItem[items][item] })
        }
      }
    }
    setCartData(tempData)
  }, [cartItem])

  return (
    <div className="min-h-screen pt-[70px] pb-[80px] md:pb-0 relative overflow-hidden
      bg-gradient-to-b from-[#0c2025] via-[#141414] to-[#0a1a20]">
      
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 px-4 md:px-10">

      {/* Header */}
      <div className="text-center pt-12 pb-6 animate-fade-in-down">
        <Title text1="YOUR" text2="CART" />
      </div>

      {cartData.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-24 animate-scale-in">
          <MdOutlineShoppingCart className="w-24 h-24 text-white/10 mb-4" />
          <p className="text-white/40 text-xl font-semibold mb-2">Your cart is empty</p>
          <p className="text-white/25 text-sm mb-8">Add some items to get started!</p>
          <button
            onClick={() => navigate('/collection')}
            className="px-8 py-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-cyan-500 to-indigo-600
              hover:from-cyan-400 hover:to-indigo-500
              shadow-lg shadow-cyan-500/30 transition-all hover:scale-105"
          >
            Browse Collections →
          </button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* Cart items */}
          <div className="flex flex-col gap-4">
            {cartData.map((item, index) => {
              const productData = products.find(p => p._id === item._id)
              if (!productData) return null
              return (
                <div
                  key={index}
                  className="glass border border-white/10 rounded-2xl p-4 flex items-center gap-4
                    animate-fade-in-up hover-lift"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  {/* Product image */}
                  <img
                    src={productData.image1}
                    alt={productData.name}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0 border border-white/10"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-[16px] truncate">{productData.name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-cyan-300 font-bold text-[15px]">{currency}{productData.price}</span>
                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold text-white/60
                        bg-white/5 border border-white/10">
                        {item.size}
                      </span>
                    </div>
                  </div>

                  {/* Quantity stepper */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => item.quantity > 1 && updateQuantity(item._id, item.size, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg glass border border-white/15 text-white
                        hover:border-cyan-400/50 hover:text-cyan-300 transition-all text-lg font-bold
                        flex items-center justify-center"
                    >−</button>
                    <span className="w-8 text-center text-white font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg glass border border-white/15 text-white
                        hover:border-cyan-400/50 hover:text-cyan-300 transition-all text-lg font-bold
                        flex items-center justify-center"
                    >+</button>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="p-2 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10
                      transition-all flex-shrink-0"
                  >
                    <RiDeleteBin6Line className="w-5 h-5" />
                  </button>
                </div>
              )
            })}
          </div>

          {/* Summary & Checkout */}
          <div className="mt-10 flex justify-end">
            <div className="w-full sm:w-[420px]">
              <CartTotal />
              <button
                onClick={() => cartData.length > 0 && navigate('/placeorder')}
                className="w-full mt-4 py-4 rounded-xl font-bold text-white text-[15px]
                  bg-gradient-to-r from-cyan-500 to-indigo-600
                  hover:from-cyan-400 hover:to-indigo-500
                  shadow-lg shadow-cyan-500/30
                  transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                PROCEED TO CHECKOUT →
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default Cart
