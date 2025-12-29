import Product from "../models/admin.product.model.js";
import Wishlist from "../models/user.wishlist.model.js";

export const toogleWishList = async(req,res,next)=>{
    try {
        const userId = req.user.id;
        const productId = req.params.productId;

        const product = await Product.findById(productId);
        if(!product){
            return res.status(400).json({
                success:false,
                message:"Product isnt Found"
            })
        };
        const previousProduct = await Wishlist.findOne({
            user:userId,
            product:productId
        });
        if(previousProduct){
            await Wishlist.deleteOne({_id:previousProduct._id})
            return res.status(200).json({
                success:true,
                message:"Product removed From Wishlist"
            })
        };
        const wishlist = await Wishlist.create({
            user:userId,
            product:productId
        })
        return res.status(200).json({
            success:true,
            message:"Product Added into the Wishlist",
            data:wishlist
        })
    } catch (error) {
        next(error)
    }
}

export const getMyWishlist = async(req,res,next)=>{
    try {
        const userId = req.user.id;

        const wishlist = await Wishlist.find({user:userId}).populate('user','name email');
        
        return res.status(200).json({
            success:true,
            message:"Wishlist Fetched Successfully",
            data:wishlist
        })
    } catch (error) {
        next(error);
    }
}