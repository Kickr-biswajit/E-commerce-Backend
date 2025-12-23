import bcrypt from 'bcrypt'
import Admin from "../models/admin.model.js"
import jwt from 'jsonwebtoken'

const generateToken = (id)=>{
    return jwt.sign({id},
        process.env.ADMIN_SECRET,{
            expiresIn:"1d"
        }
    )
}

export const adminSignup = async(req,res)=>{
    try {
        const {name, email, password} = req.body

        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are Required"
            })
        }
        if(password.length < 6){
            return res.status(400).json({
                success:false,
                message:"Password  must be AtLeast 6 characters"
            })
        }
        const admin = await Admin.findOne({
            $or:[{email},{name}]
        })
        if(admin){
            return res.status(400).json({
                success:false,
                message:"Email already Exist Try with a Different Email"
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt)
        
        const newAdmin = await Admin.create({
            name,
            email,
            password:hashPassword
        });
         return res.status(200).json({
            success:true,
            id:newAdmin._id,
            name:newAdmin.name,
            email:newAdmin.email,
            token:generateToken(newAdmin._id)
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Server Error in AdminSignup"
        })
    }
}
export const login = async(req,res)=>{
    try {
        const {email,password} = req.body

        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const admin = await Admin.findOne({email})
        if(!admin){
            return res.status(400).json({
                success:false,
                message:"Admin not found"
            })
        }
        const isMatchedPassword = await bcrypt.compare(password,admin.password)
        if(!isMatchedPassword){
            return res.status(400).json({
                success:false,
                message:"Incorrect Password"
            })
        }
        return res.status(200).json({
            success:true,
            id:admin._id,
            name:admin.name,
            email:admin.email,
            token:generateToken(admin._id)
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Server Error in AdminLogin"
        })
    }
}
export const adminProfile = async(req,res)=>{
    try {
        const adminId = req.admin.id

        const admin = await Admin.findById(adminId).select('-password')
        if(!admin){
            return res.status(400).json({
                success:false,
                message:"NO admin found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Profile Fetched successfully",
            data:admin
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Server error in Admin-profile"
        })
    }
}