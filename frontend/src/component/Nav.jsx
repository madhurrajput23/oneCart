import React, { useContext, useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";
import { userDataContext } from "../context/UserContext";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate, useLocation } from "react-router-dom";

function Nav() {
  const { userData, setUserData } = useContext(userDataContext);
  const { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext);
  const [showProfile, setShowProfile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll shadow effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("onecart_user");
    setUserData(null);
    navigate("/login");
  };

  const navLinks = [
    { label: 'HOME',        path: '/' },
    { label: 'COLLECTIONS', path: '/collection' },
    { label: 'ABOUT',       path: '/about' },
    { label: 'CONTACT',     path: '/contact' },
  ];

  const cartCount = getCartCount();

  return (
    <>
      <nav className={`w-full h-[70px] fixed top-0 left-0 right-0 z-50
        flex items-center justify-between px-6 md:px-10
        transition-all duration-500
        ${scrolled
          ? 'bg-[#060f12]/95 backdrop-blur-xl shadow-lg shadow-black/40 border-b border-white/5'
          : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="OneCart" className="w-8 h-8 transition-transform group-hover:rotate-12 duration-300" />
          <span className="text-xl font-bold gradient-text">OneCart</span>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, path }) => {
            const active = location.pathname === path;
            return (
              <li key={label}>
                <button
                  onClick={() => navigate(path)}
                  className={`relative px-4 py-2 text-[13px] font-semibold tracking-wide rounded-lg
                    transition-all duration-200
                    ${active
                      ? 'text-cyan-300 bg-cyan-500/10'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {label}
                  {active && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-cyan-400" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right icons */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button
            onClick={() => { setShowSearch(p => !p); navigate('/collection'); }}
            className="p-2 rounded-lg text-white/60 hover:text-cyan-400 hover:bg-white/5 transition-all"
          >
            {showSearch
              ? <IoSearchCircleSharp className="w-7 h-7 text-cyan-400" />
              : <IoSearchCircleOutline className="w-7 h-7" />
            }
          </button>

          {/* Cart */}
          <button
            className="relative p-2 rounded-lg text-white/60 hover:text-cyan-400 hover:bg-white/5 transition-all hidden md:flex"
            onClick={() => navigate('/cart')}
          >
            <MdOutlineShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center
                rounded-full text-[10px] font-bold text-white
                bg-gradient-to-r from-cyan-500 to-indigo-600 animate-pulse-glow">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(p => !p)}
              className="p-1 rounded-lg hover:bg-white/5 transition-all"
            >
              {userData ? (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600
                  flex items-center justify-center text-white text-sm font-bold shadow-md">
                  {userData.name?.slice(0, 1).toUpperCase()}
                </div>
              ) : (
                <FaCircleUser className="w-7 h-7 text-white/60 hover:text-cyan-400 transition-colors" />
              )}
            </button>

            {/* Dropdown */}
            {showProfile && (
              <div className="absolute right-0 top-[calc(100%+8px)] w-52 rounded-xl overflow-hidden
                glass-dark border border-white/10 shadow-2xl animate-scale-in z-50">
                {userData && (
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-white font-semibold text-sm">{userData.name}</p>
                    <p className="text-white/40 text-xs truncate">{userData.email}</p>
                  </div>
                )}
                <ul className="py-1">
                  {!userData && (
                    <li>
                      <button
                        onClick={() => { navigate('/login'); setShowProfile(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-cyan-300 transition-colors"
                      >Login</button>
                    </li>
                  )}
                  {userData && (
                    <>
                      <li>
                        <button
                          onClick={() => { navigate('/order'); setShowProfile(false); }}
                          className="w-full text-left px-4 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-cyan-300 transition-colors"
                        >📦 My Orders</button>
                      </li>
                      <li>
                        <button
                          onClick={() => { navigate('/cart'); setShowProfile(false); }}
                          className="w-full text-left px-4 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-cyan-300 transition-colors"
                        >🛒 Cart</button>
                      </li>
                      <li>
                        <button
                          onClick={() => { navigate('/about'); setShowProfile(false); }}
                          className="w-full text-left px-4 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-cyan-300 transition-colors"
                        >ℹ️ About</button>
                      </li>
                      <li className="border-t border-white/10 mt-1">
                        <button
                          onClick={() => { handleLogout(); setShowProfile(false); }}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                        >🚪 Log Out</button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Search bar expansion */}
        {showSearch && (
          <div className="absolute top-full left-0 right-0 px-6 py-3
            bg-[#060f12]/98 backdrop-blur-xl border-b border-white/5
            animate-fade-in-down shadow-xl">
            <div className="max-w-xl mx-auto relative">
              <IoSearchCircleOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search products…"
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass border border-white/10
                  text-white placeholder-white/30 text-sm outline-none focus:border-cyan-400/50 transition-colors"
                onChange={e => setSearch(e.target.value)}
                value={search}
              />
            </div>
          </div>
        )}
      </nav>

      {/* Mobile bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 h-[70px] z-50
        bg-[#060f12]/98 backdrop-blur-xl border-t border-white/5
        flex items-center justify-around px-4 md:hidden">
        {[
          { icon: IoMdHome,             label: 'Home',        path: '/' },
          { icon: HiOutlineCollection,  label: 'Collections', path: '/collection' },
          { icon: MdContacts,           label: 'Contact',     path: '/contact' },
          { icon: MdOutlineShoppingCart,label: 'Cart',        path: '/cart' },
        ].map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path;
          return (
            <button
              key={label}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-all duration-200
                ${active ? 'text-cyan-400 scale-110' : 'text-white/40 hover:text-white/70'}`}
            >
              <div className="relative">
                <Icon className="w-6 h-6" />
                {label === 'Cart' && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center
                    rounded-full text-[8px] font-bold text-white bg-gradient-to-r from-cyan-500 to-indigo-600">
                    {cartCount}
                  </span>
                )}
              </div>
              {label}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default Nav;
