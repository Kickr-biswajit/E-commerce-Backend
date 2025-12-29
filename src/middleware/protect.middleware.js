import express from 'express'
import jwt from 'jsonwebtoken'

export const userProtectRoute = async(req,res,next)=>{
    let token;
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
             token = req.headers.authorization.split(' ')[1]
        }
        if(!token){
            return res.status(400).json({
                success:false,
                message:"No token Provided"
            })
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            id:decoded.id
        }
        next()
    } catch (error) {
        return res.status(500).json(
           {
             success:false,
            message:"Server Error in UserProtectedRoute"
        }
        )
    }
}