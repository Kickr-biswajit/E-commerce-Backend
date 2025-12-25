import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../db/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params:async(req,file)=>{
        let folder = 'uploads'
        if(req.baseUrl.includes('users')){
            folder='profile-pics';
        }
        if(req.baseUrl.includes('admins')){
            folder='profile-pic'
        }
        if(req.baseUrl.includes('products')){
            folder='product-image'
        }
        return {
            folder,
            allowed_formats:['jpg','jpeg','png','webp'],
            public_id:`${Date.now()}-${file.originalname.split('.')[0]}`
        }
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    }else{
        cb(new Error('Only image files are Allowed'),false)
    }
};
const upload = multer({
    storage,
    fileFilter,
    limits: {fileSize :5 * 1024 * 1024},
})

export default upload;