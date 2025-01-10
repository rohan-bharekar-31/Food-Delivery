import mongoose from "mongoose";

const backupSchema=new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false})

const backupModel=mongoose.models.backup||mongoose.model("backup",backupSchema)

export  default backupModel;