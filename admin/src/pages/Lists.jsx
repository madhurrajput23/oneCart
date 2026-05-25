import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { MdInventory2, MdEdit } from 'react-icons/md'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Lists() {
  let navigate = useNavigate()
  let [list, setList] = useState([])
  let [deleting, setDeleting] = useState(null)
  let { serverUrl } = useContext(authDataContext)

  const fetchList = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list")
      setList(result.data)
    } catch (error) { console.log(error) }
  }

  const removeList = async (id) => {
    setDeleting(id)
    try {
      let result = await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true })
      if (result.data) { fetchList(); toast.success("Product removed") }
      else toast.error("Failed to remove product")
    } catch (error) { console.log(error); toast.error("Error removing product") }
    finally { setDeleting(null) }
  }

  useEffect(() => { fetchList() }, [])

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#060f12] via-[#0c1a1f] to-[#141414] text-white">
      <Nav />
      <Sidebar />

      <div className="md:ml-[220px] ml-[70px] pt-[70px] px-6 md:px-10 py-8">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-8 animate-fade-in-down">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Product List</h1>
              <p className="text-white/40 text-sm">{list.length} products in catalog</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10">
              <MdInventory2 className="text-cyan-400 w-4 h-4" />
              <span className="text-cyan-300 text-sm font-semibold">{list.length} items</span>
            </div>
          </div>

          {list.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-28 animate-scale-in">
              <MdInventory2 className="w-20 h-20 text-white/10 mb-4" />
              <p className="text-white/40 text-xl font-semibold">No products yet</p>
              <p className="text-white/25 text-sm mt-1">Add your first product to get started</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {/* Table header */}
              <div className="hidden md:grid grid-cols-[80px_1fr_100px_90px_60px] gap-4
                px-5 py-3 rounded-xl bg-white/3 border border-white/5">
                <span className="text-white/30 text-xs font-semibold uppercase tracking-wide">Image</span>
                <span className="text-white/30 text-xs font-semibold uppercase tracking-wide">Product</span>
                <span className="text-white/30 text-xs font-semibold uppercase tracking-wide">Category</span>
                <span className="text-white/30 text-xs font-semibold uppercase tracking-wide">Price</span>
                <span className="text-white/30 text-xs font-semibold uppercase tracking-wide">Action</span>
              </div>

              {list.map((item, index) => (
                <div
                  key={index}
                  className="glass border border-white/10 rounded-2xl p-4 md:p-0 md:px-5 md:py-4
                    flex flex-col md:grid md:grid-cols-[80px_1fr_100px_90px_60px] md:items-center gap-4
                    hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Image */}
                  <div className="w-[70px] h-[70px] rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                    <img src={item.image1} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Name */}
                  <div>
                    <p className="text-white font-semibold text-[15px] truncate mb-0.5">{item.name}</p>
                    <p className="text-white/30 text-xs md:hidden">{item.category} · ₹{item.price}</p>
                  </div>

                  {/* Category */}
                  <span className="hidden md:block px-2.5 py-1 rounded-lg text-xs font-semibold
                    bg-indigo-500/15 text-indigo-300 border border-indigo-400/20 w-fit">
                    {item.category}
                  </span>

                  {/* Price */}
                  <span className="hidden md:block text-cyan-300 font-bold">₹{item.price}</span>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate('/edit', { state: { product: item } })}
                      className="w-9 h-9 rounded-xl flex items-center justify-center
                        text-blue-400/60 hover:text-blue-400 hover:bg-blue-500/10 border border-transparent
                        hover:border-blue-400/20 transition-all duration-300"
                    >
                      <MdEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeList(item._id)}
                      disabled={deleting === item._id}
                      className="w-9 h-9 rounded-xl flex items-center justify-center
                        text-red-400/60 hover:text-red-400 hover:bg-red-500/10 border border-transparent
                        hover:border-red-400/20 transition-all duration-300 disabled:opacity-40"
                    >
                      <RiDeleteBin6Line className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Lists
