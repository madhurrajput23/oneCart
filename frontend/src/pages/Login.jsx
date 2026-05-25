import React, { useState, useContext } from "react";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { userDataContext } from "../context/UserContext";
import Loading from "../component/Loading";
import { toast } from "react-toastify";
import { MdEmail, MdLock, MdShoppingBag } from "react-icons/md";

const VALID_EMAIL    = "jack123@gmail.com";
const VALID_PASSWORD = "Jack1234";

function Login() {
  const [show, setShow]         = useState(false);
  const [email, setEmail]       = useState(VALID_EMAIL);
  const [password, setPassword] = useState(VALID_PASSWORD);
  const [loading, setLoading]   = useState(false);
  const { setUserData }         = useContext(userDataContext);
  const navigate                = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        const user = { name: "Jack", email: VALID_EMAIL };
        localStorage.setItem("onecart_user", JSON.stringify(user));
        setUserData(user);
        toast.success("Welcome back, Jack! 👋");
        navigate("/");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-[#060f12] via-[#0c1a1f] to-[#141414]
      flex items-center justify-center relative overflow-hidden">

      {/* Animated blobs */}
      <div className="absolute top-[-120px] left-[-100px] w-[500px] h-[500px] rounded-full
        bg-cyan-500/10 blur-[130px] animate-float" />
      <div className="absolute bottom-[-100px] right-[-80px] w-[400px] h-[400px] rounded-full
        bg-indigo-500/12 blur-[110px]"
        style={{ animation: 'float 5s ease-in-out infinite reverse' }} />
      <div className="absolute top-[40%] right-[10%] w-[200px] h-[200px] rounded-full
        bg-purple-500/8 blur-[80px]" />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div key={i}
          className="absolute w-1 h-1 rounded-full bg-cyan-400/30"
          style={{
            top: `${15 + i * 14}%`,
            left: `${8 + i * 15}%`,
            animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`
          }} />
      ))}

      {/* Card */}
      <div className="relative w-[90%] max-w-[420px] glass border border-white/10 rounded-2xl
        shadow-2xl shadow-black/60 p-8 md:p-10 animate-scale-in">

        {/* Glow ring */}
        <div className="absolute inset-0 rounded-2xl border border-cyan-400/5
          shadow-[inset_0_0_60px_rgba(45,212,212,0.03)] pointer-events-none" />

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-600/20
              border border-cyan-400/20 flex items-center justify-center animate-float">
              <img src={Logo} alt="OneCart" className="w-9 h-9" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-cyan-500 to-indigo-600
              rounded-full flex items-center justify-center">
              <MdShoppingBag className="w-3 h-3 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold gradient-text">OneCart</h1>
          <p className="text-white/40 text-sm mt-1">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* Email */}
          <div className="relative group">
            <MdEmail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25
              group-focus-within:text-cyan-400 w-5 h-5 transition-colors duration-300" />
            <input
              type="email"
              placeholder="Email address"
              required
              autoComplete="email"
              className="w-full h-[50px] rounded-xl bg-white/5 border border-white/10
                pl-11 pr-4 text-white placeholder-white/25 text-sm outline-none
                focus:border-cyan-400/60 focus:bg-white/8 transition-all duration-300"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <MdLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25
              group-focus-within:text-cyan-400 w-5 h-5 transition-colors duration-300" />
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              required
              autoComplete="current-password"
              className="w-full h-[50px] rounded-xl bg-white/5 border border-white/10
                pl-11 pr-12 text-white placeholder-white/25 text-sm outline-none
                focus:border-cyan-400/60 focus:bg-white/8 transition-all duration-300"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button type="button"
              onClick={() => setShow(p => !p)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2
                text-white/25 hover:text-white/60 transition-colors duration-200">
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
              shadow-lg shadow-cyan-500/30 animate-pulse-glow
              transition-all duration-300 hover:scale-[1.02] active:scale-95
              disabled:opacity-60 disabled:cursor-not-allowed
              flex items-center justify-center gap-2 mt-2"
          >
            {loading ? <Loading /> : '✦ Sign In'}
          </button>
        </form>

        {/* Hint */}
        <p className="text-center text-white/20 text-[11px] mt-6 leading-relaxed">
          Demo credentials pre-filled above
        </p>
      </div>
    </div>
  );
}

export default Login;
