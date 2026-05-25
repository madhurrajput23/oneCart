import React from 'react'
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from 'react-icons/fa'
import { MdEmail, MdPhone } from 'react-icons/md'

function Footer() {
  const navigate = useNavigate()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#060f12] text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div
              className="flex items-center gap-2 cursor-pointer mb-4"
              onClick={() => navigate('/')}
            >
              <img src={logo} alt="OneCart" className="w-9 h-9" />
              <span className="text-xl font-bold gradient-text">OneCart</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Your all-in-one shopping destination. Top-quality products, unbeatable deals, and fast delivery.
            </p>
            {/* Socials */}
            <div className="flex gap-3 mt-5">
              {[FaInstagram, FaTwitter, FaFacebook, FaYoutube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center
                    text-white/50 hover:text-cyan-400 hover:border-cyan-400/40
                    border border-white/10 transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-4">Company</p>
            <ul className="space-y-2">
              {['Home', 'About Us', 'Collections', 'Delivery', 'Privacy Policy'].map(item => (
                <li key={item}>
                  <button
                    onClick={() => navigate(item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`)}
                    className="text-white/50 text-sm hover:text-cyan-300 transition-colors duration-200 hover:translate-x-1 inline-block transition-transform"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <p className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-4">Shop</p>
            <ul className="space-y-2">
              {['New Arrivals', 'Best Sellers', 'Sale', 'Men', 'Women', 'Kids'].map(item => (
                <li key={item}>
                  <button
                    onClick={() => navigate('/collection')}
                    className="text-white/50 text-sm hover:text-cyan-300 transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-4">Get In Touch</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/50 text-sm">
                <MdPhone className="text-cyan-400 flex-shrink-0" />
                +91-9876543210
              </li>
              <li className="flex items-center gap-2 text-white/50 text-sm">
                <MdEmail className="text-cyan-400 flex-shrink-0" />
                contact@onecart.com
              </li>
              <li className="flex items-center gap-2 text-white/50 text-sm">
                <MdPhone className="text-cyan-400 flex-shrink-0" />
                +1-123-456-7890
              </li>
              <li className="flex items-center gap-2 text-white/50 text-sm">
                <MdEmail className="text-cyan-400 flex-shrink-0" />
                admin@onecart.com
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 px-6 py-4">
        <p className="text-center text-white/30 text-xs">
          © {year} OneCart.com — All Rights Reserved. Made with ❤️
        </p>
      </div>
    </footer>
  )
}

export default Footer
