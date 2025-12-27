import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            price:{
                type:Number
            }
        },
    ],
    totalAmount:{
        type:Number,
        required:true
    },
    paymentMethod:{
        type:String,
        enum:['COD','ONLINE'],
        required:true
    },
    paymentStatus:{
        type:String,
        enum:['PENDING','PAID'],
        default:'PENDING'
    },
    orderStatus:{
        type:String,
        enum:['PLACED','SHIPPED','DELIVERED','CANCELLED','ON THE WAY'],
        default:'PLACED'
    }

},{timestamps:true});

const Order = mongoose.model('Order',orderSchema);
export default Order;