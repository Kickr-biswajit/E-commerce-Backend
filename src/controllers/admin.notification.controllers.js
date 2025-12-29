import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import Order from "../models/user.order.model.js";

export const allUserNotification = async(req,res,next)=>{
    try {
        const order = await Order.find().sort({createdAt:-1});
        if(!order){
            return res.status(400).json({
                success:false,
                message:"No order found"
            })
        } 
        return res.status(200).json({
            success:true,
            message:"Total orders By user",
            data:order
        })
    } catch (error) {
        next(error);
    }
}

export const sendNotification = async(req,res,next)=>{
    try {
        const adminId = req.admin.id;
        const {userId, title, message,status} = req.body;

        if(!userId || !title || !message){
            return res.status(400).json({
                success:false,
                message:"All fields Required"
            })
        }
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"No user found"
            })
        }
        const notification = await Notification.create({
            sender:adminId,
            userId,
            title,
            message,
            status
        })

        return res.status(200).json({
            success:true,
            message:`Notification Send Successfully to user:${userId}`,
            data:notification
        })
    } catch (error) {
        next(error);
    }
}