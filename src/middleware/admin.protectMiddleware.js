import jwt from 'jsonwebtoken'

export const adminProtectRoute = async(req,res,next)=>{
    let token;
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]
        }
        if(!token){
            return res.status(400).json({
                success:false,
                message:"No token found"
            })
        }
        const decoded = jwt.verify(token,process.env.ADMIN_SECRET)

        req.admin = {
            id:decoded.id
        }
        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Server Error in Admin-Middleware"
        })
    }
}