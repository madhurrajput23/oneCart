import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'

function CartTotal() {
    const {currency, delivery_fee, getCartAmount} = useContext(shopDataContext)
    const amount = getCartAmount()
    
  return (
    <div className='w-full flex flex-col gap-5'>
      <div className='flex items-center gap-2 mb-2'>
        <h2 className='text-white font-bold text-lg'>Order Summary</h2>
        <div className='h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent ml-2'></div>
      </div>
      
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between items-center text-white/70 text-[15px]'>
          <p>Subtotal</p>
          <p className='font-semibold text-white'>{currency}{amount.toFixed(2)}</p>
        </div>
        
        <div className='flex justify-between items-center text-white/70 text-[15px]'>
          <p>Shipping Fee</p>
          <p className='font-semibold text-white'>{currency}{amount === 0 ? "0.00" : delivery_fee.toFixed(2)}</p>
        </div>
        
        <div className='h-[1px] w-full bg-white/10 my-1'></div>
        
        <div className='flex justify-between items-center text-white text-[18px]'>
          <b className='font-bold'>Total</b>
          <b className='font-black text-cyan-300'>
            {currency}{amount === 0 ? "0.00" : (amount + delivery_fee).toFixed(2)}
          </b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
