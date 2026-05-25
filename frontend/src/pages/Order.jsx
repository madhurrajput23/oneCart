import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { MdOutlineShoppingBag, MdRefresh } from 'react-icons/md'
import { FaBoxOpen } from 'react-icons/fa'

const STATUS_CONFIG = {
  'Order Placed': { color: 'text-blue-400', bg: 'bg-blue-400/15 border-blue-400/30', dot: 'bg-blue-400' },
  'Packing':      { color: 'text-yellow-400', bg: 'bg-yellow-400/15 border-yellow-400/30', dot: 'bg-yellow-400' },
  'Shipped':      { color: 'text-purple-400', bg: 'bg-purple-400/15 border-purple-400/30', dot: 'bg-purple-400' },
  'Out for delivery': { color: 'text-orange-400', bg: 'bg-orange-400/15 border-orange-400/30', dot: 'bg-orange-400' },
  'Delivered':    { color: 'text-green-400', bg: 'bg-green-400/15 border-green-400/30', dot: 'bg-green-400' },
}

function Order() {
  let [orderData, setOrderData] = useState([])
  let [refreshing, setRefreshing] = useState(false)
  let { currency } = useContext(shopDataContext)
  let { serverUrl } = useContext(authDataContext)

  const loadOrderData = async () => {
    setRefreshing(true)
    try {
      const result = await axios.post(serverUrl + '/api/order/userorder', {}, { withCredentials: true })
      if (result.data) {
        let allOrdersItem = []
        result.data.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) { console.log(error) }
    finally { setRefreshing(false) }
  }

  useEffect(() => { loadOrderData() }, [])

  return (
    <div className="min-h-screen pt-[70px] pb-[80px] md:pb-0
      bg-gradient-to-b from-[#0c2025] via-[#141414] to-[#0a1a20] px-4 md:px-10">

      {/* Decorative blobs */}
      <div className="fixed top-20 right-0 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between pt-12 pb-8 animate-fade-in-down">
          <Title text1="MY" text2="ORDERS" />
          <button
            onClick={loadOrderData}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/10
              text-white/60 hover:text-cyan-300 hover:border-cyan-400/30 text-sm font-medium
              transition-all duration-300 hover:scale-105"
          >
            <MdRefresh className={`w-4 h-4 ${refreshing ? 'animate-spin-slow' : ''}`} />
            Refresh
          </button>
        </div>

        {orderData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 animate-scale-in">
            <FaBoxOpen className="w-20 h-20 text-white/10 mb-4" />
            <p className="text-white/40 text-xl font-semibold mb-2">No orders yet</p>
            <p className="text-white/25 text-sm">Your order history will appear here</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {orderData.map((item, index) => {
              const statusCfg = STATUS_CONFIG[item.status] || STATUS_CONFIG['Order Placed']
              return (
                <div
                  key={index}
                  className="glass border border-white/10 rounded-2xl p-4 md:p-6
                    hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.07}s` }}
                >
                  <div className="flex flex-col md:flex-row items-start gap-5">
                    {/* Product image */}
                    <div className="w-[110px] h-[110px] rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                      <img src={item.image1} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-lg mb-2 truncate">{item.name}</p>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-cyan-300 font-bold text-base">{currency} {item.price}</span>
                        <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold text-white/60 bg-white/5 border border-white/10">
                          Qty: {item.quantity}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold text-white/60 bg-white/5 border border-white/10">
                          {item.size}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs text-white/40">
                        <span>📅 {new Date(item.date).toDateString()}</span>
                        <span>💳 {item.paymentMethod}</span>
                        <span>🔒 Payment: {item.payment ? 'Confirmed' : 'Pending'}</span>
                      </div>
                    </div>

                    {/* Status & Track button */}
                    <div className="flex md:flex-col items-center md:items-end gap-3 flex-shrink-0">
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${statusCfg.bg} ${statusCfg.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                        {item.status}
                      </div>
                      <button
                        onClick={loadOrderData}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-white
                          bg-gradient-to-r from-cyan-500/20 to-indigo-500/20
                          border border-cyan-400/20 hover:border-cyan-400/50
                          hover:from-cyan-500/30 hover:to-indigo-500/30
                          transition-all duration-300 hover:scale-105 whitespace-nowrap"
                      >
                        Track Order →
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Order
