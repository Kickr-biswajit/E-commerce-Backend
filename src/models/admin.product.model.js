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
    images:[{
        type:String,
        required:true
    }],
    brand:{
        type:String,
    },
    minimumAge:{
        type:String
    },
    highlights: [
     {
        idealFor: {
        type: String,
        enum: ["Baby Boys", "Baby Girls", "Unisex", "Every Kid"]
        },
         material: String,
         colour: String,
         height: String,
         width: String,
         length: String,
         weight: String
         }
    ],

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin'
    },
    stock:{
        type:String,
        enum:['Available','Out of Stuck', 'Only few Left','Hot deal','Coming Soon'],
        default:'Available'
    },
    delivery:{
        type:String,
        enum:['Cash on Delivery','Online Payment'],
        default:'Cash on delivery'
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    }
},{timestamps:true})

const Product = mongoose.model("Product",productSchema);
export default Product;