import Banner from "../models/admin.banner.model.js";

export const addBanner = async(req,res,next)=>{
    try {
        const {title, description, link, isActive} = req.body;

        if(!title || !description){
            return res.status(400).json({
                success:false,
                message:"All fields must Require"
            })
        }
        const existingBanner = await Banner.findOne({title});
        if(existingBanner){
            return res.status(400).json({
                success:false,
                message:"This Banner Title is Already Exist"
            })
        }
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:"Banner Image is Required"
            })
        }
        const bannerImage = req.file.path;
        const banner = await Banner.create({
            title,
            description,
            bannerImage,
            link,
            bannerImage:bannerImage
        })
        return res.status(200).json({
            success:true,
            message:"Banner Created Successfully",
            data:banner
        })
    } catch (error) {
        next(error)
    }
}

export const getAllBanner = async(req,res,next)=>{
    try {
        const banner = await Banner.find();
        if(!banner){
            return res.status(400).json({
                success:false,
                message:"No banner found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Banner fetched Successfully",
            data:banner
        })
    } catch (error) {
        next(error);
    }
}

export const getBannerById = async(req,res,next)=>{ 
    try {
        const bannerId = req.params.bannerId;

        const banner = await Banner.findById(bannerId);
        if(!banner){
            return res.status(400).json({
                success:false,
                message:"No banner found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Banner fetched Successfully",
            data:banner
        })
    } catch (error) {
        next(error)
    }
}

export const deleteBanner = async(req,res,next)=>{
    try {
        const bannerId = req.params.bannerId;
        
        const banner = await Banner.findByIdAndDelete(bannerId);
        if(!banner){
            return res.status(400).json({
                success:false,
                message:"No banner found to Delete"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Banner Deleted Successfully",
            data:banner
        })
    } catch (error) {
        next(error)
    }
}

export const editBanner = async(req,res,next)=>{
    try {
        const bannerId = req.params.bannerId;
        const {title,description,bannerImage} = req.body;

        const banner = await Banner.findByIdAndUpdate(bannerId,
            {new:true}
        );
        if(!banner){
            return res.status(400).json({
                success:false,
                message:"No banner found"
            })
        }
        if(title) banner.title = title;
        if(description) banner.description = description;
        if(bannerImage) banner.bannerImage = bannerImage;

        await banner.save();

        return res.status(200).json({
            success:true,
            message:"Banner Updated Successfully",
            data:banner
        })

    } catch (error) {
        next(error)
    }
}