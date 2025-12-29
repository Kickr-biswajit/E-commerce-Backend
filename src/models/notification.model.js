import express from 'express';
import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin',
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['ORDER SHIPPED','OUT OF DELIVERY','ORDER DELIVERED','CANCELLED','REFAUND','OFFERS'],
        required:true
    }
    
},{timestamps:true})

const Notification = mongoose.model('Notification',notificationSchema);
export default Notification;
