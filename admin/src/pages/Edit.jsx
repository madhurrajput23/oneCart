import React, { useContext, useState, useEffect } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import upload from '../assets/upload image.jpg'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'
import { MdCloudUpload, MdDriveFileRenameOutline, MdDescription, MdAttachMoney, MdStar } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'

function Edit() {
  const location = useLocation()
  const navigate = useNavigate()
  const product = location.state?.product

  let [image1, setImage1] = useState(false)
  let [image2, setImage2] = useState(false)
  let [image3, setImage3] = useState(false)
  let [image4, setImage4] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Men")
  const [price, setPrice] = useState("")
  const [subCategory, setSubCategory] = useState("TopWear")
  const [bestseller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [loading, setLoading] = useState(false)
  let { serverUrl } = useContext(authDataContext)

  useEffect(() => {
    if (!product) {
      navigate('/lists')
      return
    }
    setName(product.name)
    setDescription(product.description)
    setCategory(product.category)
    setSubCategory(product.subCategory)
    setPrice(product.price)
    setBestSeller(product.bestseller)
    setSizes(product.sizes || [])
  }, [product, navigate])

  const handleUpdateProduct = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      let formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))
      if (image1) formData.append("image1", image1)
      if (image2) formData.append("image2", image2)
      if (image3) formData.append("image3", image3)
      if (image4) formData.append("image4", image4)

      let result = await axios.post(`${serverUrl}/api/product/update/${product._id}`, formData, { withCredentials: true })
      toast.success("Product updated successfully! ✓")
      setLoading(false)
      navigate('/lists')
    } catch (error) {
      console.log(error); setLoading(false)
      toast.error("Failed to update product")
    }
  }

  const ImageUpload = ({ id, image, setImage, label, existingUrl }) => (
    <label htmlFor={id} className="cursor-pointer group">
      <div className={`w-[90px] h-[90px] rounded-xl overflow-hidden border-2 transition-all duration-300
        flex items-center justify-center relative
        ${image || existingUrl
          ? 'border-cyan-400/50 shadow-lg shadow-cyan-400/10'
          : 'border-white/10 hover:border-cyan-400/40 bg-white/3 hover:bg-white/5'
        }`}>
        <img
          src={image ? URL.createObjectURL(image) : (existingUrl || upload)}
          alt={label}
          className={`${image || existingUrl ? 'w-full h-full object-cover' : 'w-[60%] h-[60%] object-contain opacity-40 group-hover:opacity-60'} transition-all`}
        />
        {(image || existingUrl) && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">Change</span>
          </div>
        )}
      </div>
      <p className="text-[10px] text-white/30 text-center mt-1">{label}</p>
      <input type="file" id={id} hidden onChange={(e) => setImage(e.target.files[0])} />
    </label>
  )

  const inputClass = `w-full rounded-xl bg-white/5 border border-white/10 px-4 text-white
    placeholder-white/30 text-sm outline-none focus:border-cyan-400/50 focus:bg-white/8
    transition-all duration-300`

  const selectClass = `rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-white/80
    text-sm outline-none focus:border-cyan-400/50 cursor-pointer transition-all duration-300`

  const sizeClass = (s) =>
    `px-4 py-2.5 rounded-xl text-sm font-bold cursor-pointer border-2 transition-all duration-200
    ${sizes.includes(s)
      ? 'bg-gradient-to-br from-cyan-500 to-indigo-600 border-transparent text-white shadow-lg shadow-cyan-500/30 scale-105'
      : 'bg-white/5 border-white/15 text-white/60 hover:border-cyan-400/40 hover:text-white'
    }`

  if (!product) return null

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#060f12] via-[#0c1a1f] to-[#141414] text-white">
      <Nav />
      <Sidebar />

      {/* Main content */}
      <div className="md:ml-[220px] ml-[70px] pt-[70px] px-6 md:px-10 py-8">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-8 animate-fade-in-down">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Edit Product</h1>
            <p className="text-white/40 text-sm">Update product details and save changes</p>
          </div>

          <form onSubmit={handleUpdateProduct} className="flex flex-col gap-6 animate-fade-in-up">

            {/* Image upload */}
            <div className="glass border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <MdCloudUpload className="text-cyan-400 w-5 h-5" />
                <p className="text-white font-semibold">Product Images</p>
                <span className="text-white/30 text-xs">(upload new image to replace existing)</span>
              </div>
              <div className="flex gap-4 flex-wrap">
                <ImageUpload id="image1" image={image1} setImage={setImage1} label="Image 1" existingUrl={product.image1} />
                <ImageUpload id="image2" image={image2} setImage={setImage2} label="Image 2" existingUrl={product.image2} />
                <ImageUpload id="image3" image={image3} setImage={setImage3} label="Image 3" existingUrl={product.image3} />
                <ImageUpload id="image4" image={image4} setImage={setImage4} label="Image 4" existingUrl={product.image4} />
              </div>
            </div>

            {/* Name */}
            <div className="glass border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <MdDriveFileRenameOutline className="text-cyan-400 w-5 h-5" />
                <label className="text-white font-semibold text-sm">Product Name</label>
              </div>
              <input type="text" placeholder="e.g. Slim Fit Cotton T-Shirt"
                className={`${inputClass} h-[48px]`}
                onChange={(e) => setName(e.target.value)} value={name} required />
            </div>

            {/* Description */}
            <div className="glass border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <MdDescription className="text-cyan-400 w-5 h-5" />
                <label className="text-white font-semibold text-sm">Product Description</label>
              </div>
              <textarea placeholder="Describe the product — material, fit, care instructions…"
                rows={4}
                className={`${inputClass} py-3 resize-none`}
                onChange={(e) => setDescription(e.target.value)} value={description} required />
            </div>

            {/* Category & Subcategory & Price */}
            <div className="glass border border-white/10 rounded-2xl p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-2 block">Category</label>
                  <select className={`${selectClass} w-full`} onChange={(e) => setCategory(e.target.value)} value={category}>
                    <option value="Men" className="bg-[#141414]">Men</option>
                    <option value="Women" className="bg-[#141414]">Women</option>
                    <option value="Kids" className="bg-[#141414]">Kids</option>
                  </select>
                </div>
                <div>
                  <label className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-2 block">Sub-Category</label>
                  <select className={`${selectClass} w-full`} onChange={(e) => setSubCategory(e.target.value)} value={subCategory}>
                    <option value="TopWear" className="bg-[#141414]">Top Wear</option>
                    <option value="BottomWear" className="bg-[#141414]">Bottom Wear</option>
                    <option value="WinterWear" className="bg-[#141414]">Winter Wear</option>
                  </select>
                </div>
                <div>
                  <label className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-2 block flex items-center gap-1">
                    <MdAttachMoney className="inline text-cyan-400" /> Price (₹)
                  </label>
                  <input type="number" placeholder="e.g. 1999"
                    className={`${inputClass} h-[42px]`}
                    onChange={(e) => setPrice(e.target.value)} value={price} required />
                </div>
              </div>
            </div>

            {/* Sizes */}
            <div className="glass border border-white/10 rounded-2xl p-6">
              <p className="text-white font-semibold text-sm mb-4">Available Sizes</p>
              <div className="flex items-center gap-3 flex-wrap">
                {['S', 'M', 'L', 'XL', 'XXL'].map(s => (
                  <div
                    key={s}
                    className={sizeClass(s)}
                    onClick={() => setSizes(prev => prev.includes(s) ? prev.filter(i => i !== s) : [...prev, s])}
                  >{s}</div>
                ))}
              </div>
            </div>

            {/* Bestseller */}
            <div className="glass border border-white/10 rounded-2xl px-6 py-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => setBestSeller(p => !p)}
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all
                    ${bestseller ? 'bg-gradient-to-br from-yellow-400 to-orange-500 border-transparent' : 'border-white/20 group-hover:border-yellow-400/50'}`}
                >
                  {bestseller && <span className="text-black text-[11px] font-bold">✓</span>}
                </div>
                <div className="flex items-center gap-2">
                  <MdStar className={`w-5 h-5 ${bestseller ? 'text-yellow-400' : 'text-white/30'} transition-colors`} />
                  <span className={`font-semibold text-sm ${bestseller ? 'text-yellow-300' : 'text-white/60'} transition-colors`}>
                    Mark as Best Seller
                  </span>
                </div>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-white text-[15px]
                bg-gradient-to-r from-cyan-500 to-indigo-600
                hover:from-cyan-400 hover:to-indigo-500
                shadow-lg shadow-cyan-500/30
                transition-all duration-300 hover:scale-[1.01] active:scale-95
                disabled:opacity-60 disabled:cursor-not-allowed
                flex items-center justify-center gap-2"
            >
              {loading ? <Loading /> : '✦ Update Product'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Edit
