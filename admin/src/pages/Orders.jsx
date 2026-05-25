import React, { useState, useEffect, useContext } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { SiEbox } from "react-icons/si"
import { MdRefresh } from 'react-icons/md'

const STATUS_CONFIG = {
  'Order Placed':      { color: 'text-blue-300',   bg: 'bg-blue-400/10 border-blue-400/25',   dot: 'bg-blue-400' },
  'Packing':           { color: 'text-yellow-300',  bg: 'bg-yellow-400/10 border-yellow-400/25', dot: 'bg-yellow-400' },
  'Shipped':           { color: 'text-purple-300',  bg: 'bg-purple-400/10 border-purple-400/25', dot: 'bg-purple-400' },
  'Out for delivery':  { color: 'text-orange-300',  bg: 'bg-orange-400/10 border-orange-400/25', dot: 'bg-orange-400' },
  'Delivered':         { color: 'text-green-300',   bg: 'bg-green-400/10 border-green-400/25',  dot: 'bg-green-400' },
}

function Orders() {
  let [orders, setOrders] = useState([])
  let [refreshing, setRefreshing] = useState(false)
  let { serverUrl } = useContext(authDataContext)

  const fetchAllOrders = async () => {
    setRefreshing(true)
    try {
      const result = await axios.post(serverUrl + '/api/order/list', {}, { withCredentials: true })
      setOrders(result.data.reverse())
    } catch (error) { console.log(error) }
    finally { setRefreshing(false) }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(serverUrl + '/api/order/status', { orderId, status: e.target.value }, { withCredentials: true })
      if (result.data) await fetchAllOrders()
    } catch (error) { console.log(error) }
  }

  useEffect(() => { fetchAllOrders() }, [])

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#060f12] via-[#0c1a1f] to-[#141414] text-white">
      <Nav />
      <Sidebar />

      <div className="md:ml-[220px] ml-[70px] pt-[70px] px-4 md:px-8 py-8">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-8 animate-fade-in-down">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">All Orders</h1>
              <p className="text-white/40 text-sm">{orders.length} orders total</p>
            </div>
            <button
              onClick={fetchAllOrders}
              className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/10
                text-white/60 hover:text-cyan-300 hover:border-cyan-400/30 text-sm font-medium
                transition-all duration-300 hover:scale-105"
            >
              <MdRefresh className={`w-4 h-4 ${refreshing ? 'animate-spin-slow' : ''}`} />
              Refresh
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-28 animate-scale-in">
              <SiEbox className="w-20 h-20 text-white/10 mb-4" />
              <p className="text-white/40 text-xl font-semibold">No orders yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {orders.map((order, index) => {
                const statusCfg = STATUS_CONFIG[order.status] || STATUS_CONFIG['Order Placed']
                return (
                  <div
                    key={index}
                    className="glass border border-white/10 rounded-2xl p-5 hover-lift animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-5">

                      {/* Box icon */}
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20
                        border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
                        <SiEbox className="w-5 h-5 text-cyan-400" />
                      </div>

                      {/* Items & Address */}
                      <div className="flex-1 min-w-0">
                        {/* Items */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {order.items.map((item, i) => (
                            <span key={i}
                              className="px-2 py-0.5 rounded-lg text-xs font-medium text-cyan-300 bg-cyan-400/10 border border-cyan-400/15">
                              {item.name} ×{item.quantity} ({item.size})
                            </span>
                          ))}
                        </div>
                        {/* Address */}
                        <p className="text-white/70 text-sm font-semibold">
                          {order.address.firstName} {order.address.lastName}
                        </p>
                        <p className="text-white/30 text-xs truncate">
                          {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country} - {order.address.pinCode}
                        </p>
                        <p className="text-white/25 text-xs mt-0.5">{order.address.phone}</p>
                      </div>

                      {/* Meta */}
                      <div className="flex flex-col gap-1 text-xs text-white/40 flex-shrink-0 min-w-[140px]">
                        <span>📦 {order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
                        <span>💳 {order.paymentMethod}</span>
                        <span className={order.payment ? 'text-green-400' : 'text-yellow-400'}>
                          {order.payment ? '✓ Paid' : '⏳ Pending'}
                        </span>
                        <span className="text-white font-bold text-sm mt-1">₹ {order.amount}</span>
                        <span>{new Date(order.date).toLocaleDateString()}</span>
                      </div>

                      {/* Status selector */}
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${statusCfg.bg} ${statusCfg.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                          {order.status}
                        </div>
                        <select
                          value={order.status}
                          onChange={(e) => statusHandler(e, order._id)}
                          className="text-xs rounded-xl bg-white/5 border border-white/15 px-3 py-2
                            text-white/70 outline-none focus:border-cyan-400/50 cursor-pointer
                            transition-all duration-200"
                        >
                          {['Order Placed', 'Packing', 'Shipped', 'Out for delivery', 'Delivered'].map(s => (
                            <option key={s} value={s} className="bg-[#141414]">{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Orders
