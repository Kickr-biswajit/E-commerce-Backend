import Product from "../models/admin.product.model.js";

export const allProducts = async(req,res,next)=>{
    try {
        const {search}  =req.query;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page-1)*limit;
        const query = {};

        if(search){
            query.name = {$regex :search, $options:'i'}
        }

        const total = await Product.countDocuments(query);
        const products = await Product.find(query)
                                      .populate('category','name')
                                      .sort({createdAt:-1})
                                      .skip(skip)
                                      .limit(limit);
        if(!products){
            return res.status(400).json({
                success:false,
                message:"No products Available",
            })
        }
        return res.status(200).json({
            success:true,
            message:"Products fetched Successfully",
            pagination:{
                page,
                limit,
                total,
                totalPages:Math.ceil(total/limit)
            },
            data:products
        });
    } catch (error) {
        next(error)
    }
}
export const findProductsById = async(req,res,next)=>{
    try {
        const productId = req.params.productId;

        const product = await Product.findById(productId).populate('category','name');
        if(!product){
            return res.status(400).json({
                success:false,
                message:"No produst found",
                data:product
            })
        }
        return res.status(200).json({
            success:true,
            message:"View Single product Successfully",
            data:product
        });
    } catch (error) {
        next(error);
    }
}

export const getProductsByCategory = async(req,res,next)=>{
    try {
        const categoryId = req.params.categoryId;

        const products = await Product.find({category:categoryId});
        if(!products){
            return res.status(400).json({
                success:false,
                message:"No products Found in this category"
            })
        };
        return res.status(200).json({
            success:true,
            message:"Products fetched Successfully in this Category",
            data:products
        });
    } catch (error) {
        next(error);
    }
}