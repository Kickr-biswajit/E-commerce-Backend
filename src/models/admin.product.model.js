import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        max:500
    },
    price:{
        type:Number,
        required:true
    },
    productImage:[{
        type:String
    }],
    material:{
        type:String,
        enum: ["Cotton", "Silk", "Wool"]
    },
    idealFor:{
        type:String,
        enum: ["Baby Boys", "Baby Girls", "Unisex", "Every Kid"]
    },
    brand:{
        type:String,
    },
    minimumAge:{
        type:String
    },
    colour:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true,
        default:0,
    },
   delivery:
    [
        { 
            type: String,
            enum:["Cash on Delivery","Online Payment"]
        }
     ],
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    } ,
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin'
    }  
},{timestamps:true})

const Product = mongoose.model("Product",productSchema);
export default Product;