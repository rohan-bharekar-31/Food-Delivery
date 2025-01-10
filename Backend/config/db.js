import mongoose from "mongoose";

export const connectDB=async () => {
    await mongoose.connect("mongodb+srv://Rohan6306:Rohan6306@cluster0.3l7jf.mongodb.net/Food-Delivery").then(()=>{
        console.log("DB connected")
    })
   
}