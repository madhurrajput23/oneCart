import React, { useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import logo from "../assets/logo.png"
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import { MdLogout } from 'react-icons/md'

function Nav() {
  let navigate = useNavigate()
  let location = useLocation()
  let { serverUrl } = useContext(authDataContext)
  let { getAdmin } = useContext(adminDataContext)

  const logOut = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      toast.success("Logged out successfully")
      getAdmin()
      navigate("/login")
    } catch (error) {
      console.log(error)
      toast.error("Logout failed")
    }
  }

  return (
    <div className="w-full h-[70px] bg-[#060f12]/95 backdrop-blur-xl
      fixed top-0 left-0 right-0 z-50
      flex items-center justify-between px-6 md:px-10
      border-b border-white/5 shadow-lg shadow-black/30">

      {/* Logo */}
      <div
        className="flex items-center gap-2.5 cursor-pointer group"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="OneCart" className="w-8 h-8 transition-transform group-hover:rotate-12 duration-300" />
        <span className="text-xl font-bold gradient-text">OneCart</span>
        <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
          ADMIN
        </span>
      </div>

      {/* Logout */}
      <button
        onClick={logOut}
        className="flex items-center gap-2 px-4 py-2 rounded-xl
          bg-red-500/10 border border-red-400/20 text-red-400
          hover:bg-red-500/20 hover:border-red-400/40 hover:scale-105
          transition-all duration-300 text-sm font-semibold"
      >
        <MdLogout className="w-4 h-4" />
        Log Out
      </button>
    </div>
  )
}

export default Nav
