import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { allOrders, placeOrder, placeOrderRazorpay, updateStatus, userOrders, verifyRazorpay } from '../controller/orderController.js'
import adminAuth from '../middleware/adminAuth.js'

const orderRoutes = express.Router()

//for User
orderRoutes.post("/placeorder", placeOrder)
orderRoutes.post("/razorpay", placeOrderRazorpay)
orderRoutes.post("/userorder", userOrders)
orderRoutes.post("/verifyrazorpay", verifyRazorpay)
 
//for Admin
orderRoutes.post("/list",adminAuth,allOrders)
orderRoutes.post("/status",adminAuth,updateStatus)

export default orderRoutes