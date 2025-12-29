import User from "../models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from "../db/nodemailer.js"

const genToken = (id)=>{
    return jwt.sign({id},
        process.env.JWT_SECRET,{
            expiresIn:"7d"
        }
    )
}
export const signup = async(req,res)=>{
    try {
        const {name,email,phoneNumber,password}=req.body

        if(!name || !email || !phoneNumber || !password){
            return res.status(401).json({
                success:false,
                message:"All fields are Required"
            })
        }
        if(password.length < 6){
            return res.status(400).json({
                success:false,
                message:"Password Must be AtLeast 6 Characters long"
            })
        }
        const user = await User.findOne({
            $or:[{email},{phoneNumber}]
        })
        if(user){   
            return res.status(400).json({
                success:false,
                message:"User already Exist"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = await User.create({
            name,
            email,
            phoneNumber,
            password:hashedPassword
        })
        res.status(200).json({
            success:true,
            id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            phoneNumber:newUser.phoneNumber,
            token:genToken(newUser._id)
        })

    } catch (error) {
        return res.status(500).json({
            message:"Internal Server error in Signup"
        })
    }
}
export const login = async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            })
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }

        if(user.isBlocked){
            return res.status(400).json({
                success:false,
                message:"Your account is Blocked By admin"
            })
        }
        const isMatchPassword = await bcrypt.compare(password,user.password)
        if(!isMatchPassword){
            return res.status(401).json({
                success:false,
                message:"Incorrect Password"
            })
        }

        res.status(200).json({
            success:true,
            id:user._id,
            email:user.email,
            name:user.name,
            phoneNumber:user.phoneNumber,
            token:genToken(user._id)
        })
    } catch (error) {
        return res.status(500).json({
            message:"Server error in Login"
        })
    }
}
export const userProfile = async(req,res)=>{
    try {
        const userId = req.user.id;
        
        const user = await User.findById(userId).select('-password')
        
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User profile not found"
            })
        }
        res.status(200).json({
            success:true,
            data:user
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error in UserProfile"
        })
    }
}

export const updateProfilePic = async (req, res, next) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const userId = req.user.id;
    const imageUrl = req.file.path;

    const user = await User.findByIdAndUpdate(
      userId,
      { image: imageUrl },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile pic Updated Successfully",
      data: {
        image: user.image, // must match schema
        userId: user._id
      }
    });
  } catch (error) {
    next(error);
  }
};

export const sendOtp = async(req,res,next)=>{
    try {
        const {email} = req.body;
        if(!email){
            return res.status(400).json({
                success:false,
                message:"Email is required"
            })
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"No user Found for this email"
            })
        }
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        await transporter.sendMail({
            from:process.env.EMAIL_USER,
            to:email,
            subject:"OTP Verification",
            html:`<p>Your OTP is :<b>${otp}</b>(Valid for 10 minutes)</p>`
        })
        return res.status(200).json({
            success:true,
            message:"OTP sent to your Email"
        })
    } catch (error) {
        next(error);
    }
}

export const verifyOtp = async(req,res,next)=>{
    try {
        const {email, otp} = req.body;
        if(!email || !otp){
            return res.status(400).json({
                success:false,
                message:"All fields are reqquired"
            })
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Email isnt exist"
            })
        }
        if(!user.otp || user.otp !== Number(otp)){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
        }
        if(user.otpExpiry < Date.now()){
            return res.status(400).json({
                success:false,
                message:"Expired OTP"
            })
        }
        return res.status(200).json({
            success:true,
            message:"OTP Verified Successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const resetPassword = async(req,res,next)=>{
    try {
        const {email, otp, newPassword} = req.body;
        if(!email || !otp || !newPassword){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Email doesnt Exist"
            })
        }
        if(!user.otp || user.otp !== Number(otp)){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
        }
        if(user.otpExpiry < Date.now()){
            return res.status(400).json({
                success:false,
                message:"Expired OTP"
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword,10);
        user.password = hashedPassword;

        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        return res.status(200).json({
            success:true,
            message:"Password reset Successfully",
            data:user
        })
    } catch (error) {
        next(error);
    }
}

export const forgotPassword = async(req,res,next)=>{
    try {
        const {email,otp} = req.body;
        if(!email || !otp){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"No email exist"
            })
        }
        if(!user.otp || user.otp !== Number(otp)){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
        }
        if(user.otpExpiry < Date.now()){
            return res.status(400).json({
                success:false,
                message:"Expired OTP"
            })
        }
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        return res.status(200).json({
            success:true,
            message:"Successfull forgetPassword",
            data:user
        });
    } catch (error) {
        next(error);
    }
}