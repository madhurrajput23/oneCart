import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import razorpay from '../assets/Razorpay.jpg'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/authContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'
import { MdLocationOn, MdPerson, MdEmail, MdPhone, MdHome } from 'react-icons/md'

function PlaceOrder() {
  let [method, setMethod] = useState('cod')
  let navigate = useNavigate()
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(shopDataContext)
  let { serverUrl } = useContext(authDataContext)
  let [loading, setLoading] = useState(false)

  let [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '',
    street: '', city: '', state: '',
    pinCode: '', country: '', phone: ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        const { data } = await axios.post(serverUrl + '/api/order/verifyrazorpay', response, { withCredentials: true })
        if (data) { 
          navigate("/order"); 
          setCartItem({});
          localStorage.removeItem('onecart_cart');
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      let orderItems = []
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) { itemInfo.size = item; itemInfo.quantity = cartItem[items][item]; orderItems.push(itemInfo) }
          }
        }
      }
      let orderData = { address: formData, items: orderItems, amount: getCartAmount() + delivery_fee }
      switch (method) {
        case 'cod':
          const result = await axios.post(serverUrl + "/api/order/placeorder", orderData, { withCredentials: true })
          if (result.data) { 
            setCartItem({}); 
            localStorage.removeItem('onecart_cart');
            toast.success("Order Placed Successfully! 🎉"); 
            navigate("/order"); 
            setLoading(false) 
          }
          else { toast.error("Order Failed"); setLoading(false) }
          break
        case 'razorpay':
          const resultRazorpay = await axios.post(serverUrl + "/api/order/razorpay", orderData, { withCredentials: true })
          if (resultRazorpay.data) { initPay(resultRazorpay.data); toast.success("Order Placed"); setLoading(false) }
          break
        default: break
      }
    } catch (error) { console.log(error); setLoading(false) }
  }

  const inputClass = `w-full h-[50px] rounded-xl bg-white/5 border border-white/15 px-4 text-white
    placeholder-white/30 text-sm outline-none focus:border-cyan-400/60 focus:bg-white/8
    transition-all duration-300`

  return (
    <div className="min-h-screen pt-[70px] pb-[80px] md:pb-0 bg-gradient-to-b from-[#0c2025] via-[#141414] to-[#0a1a20]">
      {/* Decorative blobs */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 relative">
        <div className="text-center mb-10 animate-fade-in-down">
          <Title text1="CHECKOUT" text2="ORDER" />
        </div>

        <form onSubmit={onSubmitHandler} className="flex flex-col lg:flex-row gap-10">

          {/* ── Left: Delivery Info ── */}
          <div className="flex-1 animate-slide-left">
            <div className="glass border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center">
                  <MdLocationOn className="text-white w-5 h-5" />
                </div>
                <h2 className="text-white font-bold text-lg">Delivery Information</h2>
              </div>

              <div className="flex flex-col gap-4">
                {/* Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                    <input type="text" placeholder="First Name" name="firstName"
                      className={`${inputClass} pl-9`} required
                      onChange={onChangeHandler} value={formData.firstName} />
                  </div>
                  <div>
                    <input type="text" placeholder="Last Name" name="lastName"
                      className={inputClass} required
                      onChange={onChangeHandler} value={formData.lastName} />
                  </div>
                </div>

                {/* Email */}
                <div className="relative">
                  <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                  <input type="email" placeholder="Email Address" name="email"
                    className={`${inputClass} pl-9`} required
                    onChange={onChangeHandler} value={formData.email} />
                </div>

                {/* Street */}
                <div className="relative">
                  <MdHome className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                  <input type="text" placeholder="Street Address" name="street"
                    className={`${inputClass} pl-9`} required
                    onChange={onChangeHandler} value={formData.street} />
                </div>

                {/* City & State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="City" name="city"
                    className={inputClass} required
                    onChange={onChangeHandler} value={formData.city} />
                  <input type="text" placeholder="State" name="state"
                    className={inputClass} required
                    onChange={onChangeHandler} value={formData.state} />
                </div>

                {/* Pincode & Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="PIN Code" name="pinCode"
                    className={inputClass} required
                    onChange={onChangeHandler} value={formData.pinCode} />
                  <input type="text" placeholder="Country" name="country"
                    className={inputClass} required
                    onChange={onChangeHandler} value={formData.country} />
                </div>

                {/* Phone */}
                <div className="relative">
                  <MdPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                  <input type="tel" placeholder="Phone Number" name="phone"
                    className={`${inputClass} pl-9`} required
                    onChange={onChangeHandler} value={formData.phone} />
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Summary & Payment ── */}
          <div className="lg:w-[420px] flex flex-col gap-6 animate-slide-right">
            {/* Cart total */}
            <div className="glass border border-white/10 rounded-2xl p-6">
              <CartTotal />
            </div>

            {/* Payment method */}
            <div className="glass border border-white/10 rounded-2xl p-6">
              <h2 className="text-white font-bold text-lg mb-5">Payment Method</h2>
              <div className="flex flex-col gap-3">
                {/* Razorpay */}
                <button
                  type="button"
                  onClick={() => setMethod('razorpay')}
                  className={`w-full h-[60px] rounded-xl flex items-center justify-center
                    border-2 transition-all duration-300 overflow-hidden
                    ${method === 'razorpay'
                      ? 'border-cyan-400 shadow-lg shadow-cyan-400/20 scale-[1.02]'
                      : 'border-white/10 hover:border-white/30'
                    }`}
                >
                  <img src={razorpay} className="h-[40px] object-contain rounded" alt="Razorpay" />
                </button>

                {/* COD */}
                <button
                  type="button"
                  onClick={() => setMethod('cod')}
                  className={`w-full h-[60px] rounded-xl flex items-center justify-center gap-3
                    border-2 font-bold text-[15px] transition-all duration-300
                    ${method === 'cod'
                      ? 'border-cyan-400 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 shadow-lg shadow-cyan-400/20 scale-[1.02]'
                      : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white/80 bg-white/3'
                    }`}
                >
                  💵 Cash on Delivery
                </button>
              </div>
            </div>

            {/* Place order button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-white text-[16px]
                bg-gradient-to-r from-cyan-500 to-indigo-600
                hover:from-cyan-400 hover:to-indigo-500
                shadow-lg shadow-cyan-500/30
                transition-all duration-300 hover:scale-[1.02] active:scale-95
                disabled:opacity-60 disabled:cursor-not-allowed
                flex items-center justify-center gap-2"
            >
              {loading ? <Loading /> : '🚀 PLACE ORDER'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PlaceOrder
