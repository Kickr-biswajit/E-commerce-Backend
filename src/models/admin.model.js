import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        type:String
    },
    otp:{
        type:String
    },
    otpExpiry:{
        type:Date
    },
    isVerified:{
        type:Boolean
    }
})

const Admin = mongoose.model('Admin',adminSchema)
export default Admin