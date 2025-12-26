import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    bannerImage:{
        type:String,
        required:true
    },
    description:{
        type:String,
        maxlength:500
    },
    link:{
        type:String,
        default:null
    },
    isAcitve:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

const Banner =mongoose.model('Banner',bannerSchema);
export default Banner;