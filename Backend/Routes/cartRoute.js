import express from 'express'
import multer from 'multer'
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js';

const upload=multer();
const cartRouter=express.Router();

cartRouter.post("/add",upload.none(),authMiddleware,addToCart);

cartRouter.post("/remove",upload.none(),authMiddleware,removeFromCart);

cartRouter.post("/get",upload.none(),authMiddleware, getCart);

export default cartRouter;