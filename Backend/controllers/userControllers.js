import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from "validator";
import backupModel from '../models/backupModel.js'

const createToken =  (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User Does not exists" })
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Password" })
        }

        const token=createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

//register user
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;
    try {

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter strong password" })
        }
        
        const backupData=new backupModel({
            name: userName,
            email: email,
            password: password
        })

        await backupData.save();
        
        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: userName,
            email: email,
            password: hashPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id);
        res.json({ success: true, token})
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }

}

export { loginUser, registerUser }
