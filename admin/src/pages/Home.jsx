import React, { useState, useContext, useEffect } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { MdInventory2, MdShoppingBag, MdTrendingUp, MdPeople } from 'react-icons/md'
import { adminDataContext } from '../context/AdminContext'

function Home() {
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [pendingOrders, setPendingOrders] = useState(0)
  const { serverUrl } = useContext(authDataContext)
  const { adminData } = useContext(adminDataContext)

  const fetchCounts = async () => {
    try {
      const products = await axios.get(`${serverUrl}/api/product/list`, { withCredentials: true })
      setTotalProducts(products.data.length)
      const orders = await axios.post(`${serverUrl}/api/order/list`, {}, { withCredentials: true })
      setTotalOrders(orders.data.length)
      setPendingOrders(orders.data.filter(o => o.status !== 'Delivered').length)
    } catch (err) { console.error("Failed to fetch counts", err) }
  }

  useEffect(() => { fetchCounts() }, [])

  const stats = [
    { icon: MdInventory2,  label: 'Total Products', value: totalProducts, color: 'from-cyan-500/20 to-cyan-500/5', iconColor: 'text-cyan-400', border: 'border-cyan-400/20' },
    { icon: MdShoppingBag, label: 'Total Orders',   value: totalOrders,   color: 'from-indigo-500/20 to-indigo-500/5', iconColor: 'text-indigo-400', border: 'border-indigo-400/20' },
    { icon: MdTrendingUp,  label: 'Active Orders',  value: pendingOrders, color: 'from-orange-500/20 to-orange-500/5', iconColor: 'text-orange-400', border: 'border-orange-400/20' },
    { icon: MdPeople,      label: 'Customers',       value: '—',           color: 'from-purple-500/20 to-purple-500/5', iconColor: 'text-purple-400', border: 'border-purple-400/20' },
  ]

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#060f12] via-[#0c1a1f] to-[#141414] text-white">
      <Nav />
      <Sidebar />

      {/* Decorative */}
      <div className="fixed top-20 right-0 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 left-[220px] w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-[80px] pointer-events-none" />

      <div className="md:ml-[220px] ml-[70px] pt-[70px] px-6 md:px-10 py-10">
        {/* Welcome */}
        <div className="mb-10 animate-fade-in-down">
          <p className="text-white/30 text-sm mb-1">Good day, Admin 👋</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-white/40 text-sm mt-2">Here's what's happening with your store today.</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-12">
          {stats.map(({ icon: Icon, label, value, color, iconColor, border }, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 bg-gradient-to-b ${color} glass border ${border} hover-lift animate-fade-in-up`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 ${iconColor}`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-1">{label}</p>
              <p className="text-3xl font-bold text-white">{value}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="glass border border-white/10 rounded-2xl p-6 animate-fade-in-up delay-400">
          <h2 className="text-white font-bold text-lg mb-5">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: '+ Add Product', path: '/add', style: 'from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/20' },
              { label: '📋 View Products', path: '/lists', style: 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white' },
              { label: '📦 View Orders', path: '/orders', style: 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white' },
            ].map(({ label, path, style }) => (
              <a key={path} href={path}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r
                  transition-all duration-300 hover:scale-105 active:scale-95 ${style}`}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
