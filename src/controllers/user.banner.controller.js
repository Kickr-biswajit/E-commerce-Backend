import Banner from "../models/admin.banner.model.js"

export const getAllBanner = async(req,res,next)=>{
    try {
        const banner = await Banner.aggregate([
            {
                $lookup:{
                    from:"users",
                    localField:"createdBy",
                    foreignField:"_id",
                    as:"user"
                }
            }
        ]);
        if(!banner) {
            return res.status(400).json({
                success:false,
                message:"No Banner found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Banners fetched Successfully",
            data:banner
        })
    } catch (error) {
        next(error)
    }
}

export const getBannerById = async(req,res,next)=>{
    try {
        const bannerId = req.params.bannerId;

        const banner = await Banner.findById(bannerId);
        if(!banner){
            return res.status(400).json({
                success:true,
                message:"No banner found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Banner fetched Successfully",
            data:banner
        });
    } catch (error) {
        next(error);
    }
}