import React from 'react'
import { IoIosAddCircleOutline } from "react-icons/io"
import { FaRegListAlt } from "react-icons/fa"
import { SiTicktick } from "react-icons/si"
import { useNavigate, useLocation } from 'react-router-dom'

const navItems = [
  { icon: IoIosAddCircleOutline, label: 'Add Product', path: '/add' },
  { icon: FaRegListAlt,          label: 'Product List', path: '/lists' },
  { icon: SiTicktick,            label: 'All Orders',   path: '/orders' },
]

function Sidebar() {
  let navigate = useNavigate()
  let location = useLocation()

  return (
    <div className="w-[70px] md:w-[220px] min-h-screen
      fixed left-0 top-0 pt-[70px] z-40
      bg-[#060f12]/95 backdrop-blur-xl
      border-r border-white/5 flex flex-col">

      <div className="flex flex-col gap-1 p-3 pt-5">
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl
                text-[13px] font-semibold transition-all duration-200 group
                ${active
                  ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/10 text-cyan-300 border border-cyan-400/20'
                  : 'text-white/40 hover:text-white/80 hover:bg-white/5 border border-transparent'
                }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-cyan-400' : 'group-hover:text-white/70'}`} />
              <span className="hidden md:block truncate">{label}</span>
              {active && <span className="hidden md:block ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />}
            </button>
          )
        })}
      </div>

      {/* Bottom decoration */}
      <div className="mt-auto p-4 hidden md:block">
        <div className="glass rounded-xl p-3 text-center">
          <p className="text-white/20 text-[10px] font-medium">OneCart Admin</p>
          <p className="text-white/10 text-[9px]">v1.0.0</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
