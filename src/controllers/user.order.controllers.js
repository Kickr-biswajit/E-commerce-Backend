import Product from "../models/admin.product.model.js";
import Notification from "../models/notification.model.js";
import Order from "../models/user.order.model.js";

export const buyItems = async(req,res,next)=>{
    try {
        const userId = req.user.id;
        const {productId, quantity, paymentMethod} = req.body;

        if(!productId || !quantity || !paymentMethod){
            return res.status(400).json({
                success:false,
                message:"All fields required"
            })
        }
        const product = await Product.findById(productId);

        if(!product){
            return res.status(400).json({
                success:false,
                message:"No products available"
            })
        }
        
        if(product.stock < quantity){
            return res.status(400).json({
                success:false,
                message:"Not Enough Stock"
            })
        } 
        const totalAmount = product.price * quantity;

        const paymentStatus = paymentMethod === "COD" ? "PENDING" : "PAID";
        console.log('////////////',totalAmount);
        
        const order = await Order.create({
            user:userId,
            items:[
                {
                    product:productId,
                    quantity,
                    price:product.price
                }
            ],
            totalAmount,
            paymentMethod,
            paymentStatus
        });
 
        await product.save();

        return res.status(200).json({
            success:true,
            message:"Product Placed Successfully",
            data:order
        })

    } catch (error) {
        next(error)
    }
}

export const totalOrderHistroy = async(req,res,next)=>{
    try {
        const userId = req.user.id;
        const order = await Order.find({user:userId}).sort({createdAt:-1});
        if(!order){
            return res.status(400).json({
                success:false,
                message:"Empty ordered list"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Orders fetched Successfully",
            data:order
        })
    } catch (error) {
        next(error)
    }
}

export const getMyOrderedItems = async(req,res,next)=>{
    try {
        const userId = req.user.id
        const orderId = req.params.orderId;

        const order = await Order.findOne({_id:orderId, user:userId}).populate('items.product').populate('user','name email');
        
        return res.status(200).json({
            success:true,
            message:"My order details",
            data:order
        })
    } catch (error) {
        next(error);
    }
}

export const getOrderNotification = async(req,res,next)=>{
    try {
        const userId = req.user.id;

        const notifictions = await Notification.find({userId}).sort({createdAt:-1});
        if(!notifictions){
            return res.status(400).json({
                success:false,
                message:"Empty Nofications"
            })
        }
        return res.status(200).json({
            success:true,
            message:`Your Notification for Order`,
            data:notifictions
        })
    } catch (error) {
        next(error);
    }
}