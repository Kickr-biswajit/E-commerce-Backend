import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import "dotenv/config"

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'e-commerce',
        format:async(req,file)=>'png',
        public_id:(req,file)=>file.fieldname + '-' + Date.now()
    },
    
})
const upload = multer({storage , limits :{ fileSize: 5 * 1024 * 1024}})

export {cloudinary, upload};