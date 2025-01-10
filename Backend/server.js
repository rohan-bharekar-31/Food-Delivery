import express, { Router } from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./Routes/foodRoute.js";
import userRouter from "./Routes/userRoute.js";
import cartRouter from "./Routes/cartRoute.js";
import orderRouter from "./Routes/orderRoute.js";
import dotenv from 'dotenv';
dotenv.config();

//app config
const app=express();
const PORT=process.env.PORT||4000;


//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())


//DB connection
connectDB();

app.use("/api/food",foodRouter)
app.use("/images",express.static("uploads"))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("API WORKING");
})

app.listen(PORT,()=>{
    console.log("Listening on http://localhost:4000/")
})

