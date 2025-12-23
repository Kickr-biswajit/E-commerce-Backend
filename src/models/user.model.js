import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    otp:{
        type:String
    },
    otpExpiry:{
        type:Date
    },
    isVerified:{
        type:Boolean
    },
    image:{
        type:String
    },
    dob:{
        type:Date
    }
})
const User = mongoose.model('User',userSchema)

export default User