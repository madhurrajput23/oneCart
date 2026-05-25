import React, { useContext, useState } from "react"
import logo from "../assets/logo.png"
import { IoEyeOutline, IoEye } from "react-icons/io5"
import axios from "axios"
import { authDataContext } from "../context/AuthContext"
import { adminDataContext } from "../context/AdminContext"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Loading from "../component/Loading"
import { MdAdminPanelSettings } from "react-icons/md"

function Login() {
  let [show, setShow] = useState(false)
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let { serverUrl } = useContext(authDataContext)
  let { getAdmin } = useContext(adminDataContext)
  let navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const AdminLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(serverUrl + "/api/auth/adminlogin", { email, password }, { withCredentials: true })
      toast.success("Welcome back, Admin! 👋")
      await getAdmin()
      navigate("/")
    } catch (error) {
      console.log(error)
      toast.error("Invalid admin credentials")
    } finally { setLoading(false) }
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-[#060f12] via-[#0c1a1f] to-[#141414]
      flex items-center justify-center relative overflow-hidden">

      {/* Decorative blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px]" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] rounded-full bg-indigo-500/10 blur-[90px]" />

      {/* Card */}
      <div className="relative w-[90%] max-w-[420px] glass border border-white/10 rounded-2xl
        shadow-2xl shadow-black/50 p-8 animate-scale-in">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <img src={logo} alt="OneCart" className="w-14 h-14 animate-float" />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-full flex items-center justify-center">
              <MdAdminPanelSettings className="w-3 h-3 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold gradient-text">OneCart Admin</h1>
          <p className="text-white/40 text-sm mt-1">Sign in to your admin panel</p>
        </div>

        {/* Form */}
        <form onSubmit={AdminLogin} className="flex flex-col gap-4">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              placeholder="Admin Email"
              required
              className="w-full h-[50px] rounded-xl bg-white/5 border border-white/10
                px-4 text-white placeholder-white/30 text-sm outline-none
                focus:border-cyan-400/60 focus:bg-white/8 transition-all duration-300"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full h-[50px] rounded-xl bg-white/5 border border-white/10
                px-4 pr-12 text-white placeholder-white/30 text-sm outline-none
                focus:border-cyan-400/60 focus:bg-white/8 transition-all duration-300"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              type="button"
              onClick={() => setShow(p => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
            >
              {show ? <IoEye className="w-5 h-5" /> : <IoEyeOutline className="w-5 h-5" />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[50px] rounded-xl font-bold text-white text-[15px]
              bg-gradient-to-r from-cyan-500 to-indigo-600
              hover:from-cyan-400 hover:to-indigo-500
              shadow-lg shadow-cyan-500/30
              transition-all duration-300 hover:scale-[1.02] active:scale-95
              disabled:opacity-60 disabled:cursor-not-allowed
              flex items-center justify-center gap-2 mt-2"
          >
            {loading ? <Loading /> : '🔑 Sign In'}
          </button>
        </form>

        <p className="text-center text-white/20 text-xs mt-6">
          OneCart Admin Panel · Restricted Access
        </p>
      </div>
    </div>
  )
}

export default Login
