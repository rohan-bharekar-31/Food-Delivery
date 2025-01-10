import express from 'express';
import multer from "multer";
import { loginUser,registerUser } from '../controllers/userControllers.js';

const upload=multer()

const userRouter=express.Router();

userRouter.post("/login",upload.none(),loginUser)
userRouter.post("/register",upload.none() ,registerUser)

export default userRouter;
