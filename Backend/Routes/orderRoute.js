import express from 'express';
import { listOrders, updateStatus, userOrders,createOrder, verifyRazorpayPayment } from "../controllers/orderController.js";
import authMiddleware from '../middleware/auth.js';

const orderRouter = express.Router();

// Route to get user's orders
orderRouter.post("/userorders", authMiddleware, userOrders);

// Route to list all orders (admin)
orderRouter.get("/list",listOrders);

// Route to update order status
orderRouter.post("/status", updateStatus);


//Route to create RazorPay Order
orderRouter.post("/create",authMiddleware,createOrder);

//Route to verify Payment
orderRouter.post("/verify",authMiddleware,verifyRazorpayPayment);

export default orderRouter;
