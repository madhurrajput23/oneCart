import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight, FaChevronDown } from "react-icons/fa"
import { MdFilterList } from 'react-icons/md'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import Card from '../component/Card'

function Collections() {
  const [showFilter, setShowFilter] = useState(false)
  const { products, search, showSearch } = useContext(shopDataContext)
  const [filterProduct, setFilterProduct] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')

  const toggleCategory = (val) =>
    setCategory(prev => prev.includes(val) ? prev.filter(i => i !== val) : [...prev, val])

  const toggleSubCategory = (val) =>
    setSubCategory(prev => prev.includes(val) ? prev.filter(i => i !== val) : [...prev, val])

  const applyFilter = () => {
    let copy = products.slice()
    if (showSearch && search) copy = copy.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    if (category.length > 0) copy = copy.filter(i => category.includes(i.category))
    if (subCategory.length > 0) copy = copy.filter(i => subCategory.includes(i.subCategory))
    setFilterProduct(copy)
  }

  const sortProducts = () => {
    let copy = filterProduct.slice()
    if (sortType === 'low-high') setFilterProduct(copy.sort((a, b) => a.price - b.price))
    else if (sortType === 'high-low') setFilterProduct(copy.sort((a, b) => b.price - a.price))
    else applyFilter()
  }

  useEffect(() => { sortProducts() }, [sortType])
  useEffect(() => { setFilterProduct(products) }, [products])
  useEffect(() => { applyFilter() }, [category, subCategory, search, showSearch])

  const FilterSection = ({ title, options, selected, toggle }) => (
    <div className="glass border border-white/10 rounded-xl p-4 mb-4">
      <p className="text-cyan-300 font-semibold text-xs uppercase tracking-widest mb-3">{title}</p>
      <div className="flex flex-col gap-2">
        {options.map(opt => (
          <label key={opt} className="flex items-center gap-3 cursor-pointer group">
            <div
              onClick={() => toggle(opt)}
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all
                ${selected.includes(opt)
                  ? 'bg-cyan-500 border-cyan-500'
                  : 'border-white/20 group-hover:border-cyan-400/50'
                }`}
            >
              {selected.includes(opt) && <span className="text-white text-[10px] font-bold">✓</span>}
            </div>
            <span className={`text-sm transition-colors
              ${selected.includes(opt) ? 'text-cyan-300 font-medium' : 'text-white/60 group-hover:text-white/80'}`}>
              {opt}
            </span>
          </label>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen pt-[70px] pb-[80px] md:pb-0
      bg-gradient-to-b from-[#0c2025] via-[#141414] to-[#0a1a20]
      flex flex-col md:flex-row">

      {/* ── Sidebar Filters ── */}
      <div className="md:w-[260px] lg:w-[280px] flex-shrink-0 md:min-h-screen
        p-4 md:p-6 md:border-r border-white/5 md:sticky md:top-[70px] md:self-start">

        {/* Mobile filter toggle */}
        <button
          className="w-full flex items-center justify-between md:cursor-default mb-4"
          onClick={() => setShowFilter(p => !p)}
        >
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <MdFilterList className="text-cyan-400 w-5 h-5" />
            FILTERS
          </div>
          <span className="md:hidden text-white/40">
            {showFilter ? <FaChevronDown /> : <FaChevronRight />}
          </span>
        </button>

        <div className={`${showFilter ? 'block' : 'hidden'} md:block`}>
          <FilterSection
            title="Category"
            options={['Men', 'Women', 'Kids']}
            selected={category}
            toggle={toggleCategory}
          />
          <FilterSection
            title="Sub-Category"
            options={['TopWear', 'BottomWear', 'WinterWear']}
            selected={subCategory}
            toggle={toggleSubCategory}
          />

          {/* Clear filters */}
          {(category.length > 0 || subCategory.length > 0) && (
            <button
              onClick={() => { setCategory([]); setSubCategory([]) }}
              className="w-full py-2 text-xs text-red-400/70 hover:text-red-400 transition-colors
                glass border border-red-400/20 rounded-xl hover:border-red-400/40"
            >
              ✕ Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* ── Products Grid ── */}
      <div className="flex-1 px-4 md:px-8 py-6">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <Title text1="ALL" text2="COLLECTIONS" />
            <p className="text-white/40 text-sm">{filterProduct.length} products found</p>
          </div>

          <select
            className="glass border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white/70
              outline-none focus:border-cyan-400/50 cursor-pointer transition-colors"
            onChange={e => setSortType(e.target.value)}
            value={sortType}
          >
            <option value="relevant" className="bg-[#141414]">Sort: Relevant</option>
            <option value="low-high" className="bg-[#141414]">Price: Low → High</option>
            <option value="high-low" className="bg-[#141414]">Price: High → Low</option>
          </select>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
          {filterProduct.map((item, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
              <Card id={item._id} name={item.name} price={item.price} image={item.image1} />
            </div>
          ))}
        </div>

        {filterProduct.length === 0 && (
          <div className="text-center py-24 animate-scale-in">
            <p className="text-white/20 text-6xl mb-4">🔍</p>
            <p className="text-white/40 text-xl font-semibold">No products found</p>
            <p className="text-white/25 text-sm mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Collections