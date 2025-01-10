import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import nodemailer from 'nodemailer';
import Razorpay from 'razorpay'
import dotenv from 'dotenv';
import crypto from 'crypto';


dotenv.config();

// Generate OTP function
function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
    return otp;
}

// Create a transporter object using Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_MAIL,  // Your email address (e.g., 'youremail@gmail.com')
        pass: process.env.USER_PASSWORD,  // Your email password (use OAuth2 or app-specific password)
    },
});

// Function to send OTP email
async function sendOrderConfirmationEmail(customerEmail, otp, orderDetails) {
    const mailOptions = {
        from: process.env.USER_MAIL,  // Sender's email
        to: customerEmail,  // Recipient's email
        subject: 'Order Confirmation - OTP for Delivery Verification',
        text: `Thank you for your order! Your order details are as follows:\n\n
                Order ID: ${orderDetails._id}\n
                Items: ${orderDetails.items.map(item => `${item.name} x ${item.quantity}`).join(', ')}\n
                Total: ₹${orderDetails.amount}\n\n
                Your OTP for delivery verification is: ${otp}\n\n
                Please keep this OTP handy when your order arrives.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP sent successfully!');
    } catch (error) {
        console.log('Error sending OTP:', error);
    }
}

//user orders for frontend

const  userOrders=async (req,res) => {
    try {
        const orders=await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

//listing orders for admin panel
const listOrders=async (req,res)=>{
    try {
        const orders=await orderModel.find();
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// api for updating order status

const updateStatus=async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const createOrder=async (req,res) => {
    const razorpay=new Razorpay({
        key_id:process.env.RAZORPAY_KEY_ID,
        key_secret:process.env.RAZORPAY_KEY_SECRET
    })
    
    const options={
        amount:req.body.amount*100,
        currency:"INR",
        receipt: 'order_receipt_' + new Date().getTime(),
    }
    
    try {
        const order=await razorpay.orders.create(options)
        res.json({success:true,order})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const verifyRazorpayPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, items, amount, address } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

    if (generatedSignature === razorpay_signature) {
        try {
            // Generate OTP
            const otp = generateOTP();

            // Save the order in the database after successful payment
            const newOrder = new orderModel({
                userId,
                items,
                amount,
                address,
                otp,
                paymentId: razorpay_payment_id,
            });

            const savedOrder = await newOrder.save();
            await userModel.findByIdAndUpdate(savedOrder.userId,{cartData:{}})

            // Send confirmation email with OTP and order details
            await sendOrderConfirmationEmail(address.email, otp, savedOrder);

            

            res.status(201).json({ success: true, message: "Payment verified and order created.", orderId: savedOrder._id });
        } catch (error) {
            console.error("Error saving verified order:", error);
            res.status(500).json({ success: false, message: "Error saving order after verification" });
        }
    } else {
        res.status(400).json({ success: false, message: "Payment verification failed" });
    }
};


export {  userOrders,listOrders,updateStatus,createOrder,verifyRazorpayPayment};
