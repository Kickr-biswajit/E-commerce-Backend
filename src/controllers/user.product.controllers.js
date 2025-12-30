import Product from "../models/admin.product.model.js";

export const allProducts = async(req,res,next)=>{
    try {
        const { search } = req.query;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page-1)*limit;

        const pipeline = [
            {
                $lookup:{
                    from:"categories",
                    localField:"category",
                    foreignField:"_id",
                    as:"category"
                }
            },
            {$unwind:"$category"}
        ]
            if(search){
                pipeline.push({
                    $match:{
                        $or:[
                            {name :{$regex:search, $options:'i'}},
                            {"category.name":{$regex:search, $options:'i'}},
                            {"category.subName":{$regex:search, $options:'i'}},
                            {brand :{$regex:search, $options:'i'}}
                        ]
                    }
                });
            }
            pipeline.push(
                {$sort: {createdAt:-1}},
                {$skip: skip},
                {$limit: limit},
                {
                    $project:{
                        name:1,
                        price:1,
                        productImage:1,
                        brand:1,
                        stock:1,
                        category :{
                            name:"$category.name",
                            subname:"$category.subName"
                        }
                    }
                }
            );
        const products  =await Product.aggregate(pipeline);
        return res.status(200).json({
            success:false,
            message:"Product Fetched Successfuly",
            data:products
        })
        // const query = {};

        // if(search){
        //     query.name = {$regex :search, $options:'i'}
        // }

        // const total = await Product.countDocuments(query);
        // const products = await Product.find(query).select('name price images brand ')
        //                               .populate('category', 'name')
        //                               .sort({createdAt:-1})
        //                               .skip(skip)
        //                               .limit(limit);
        // if(!products){
        //     return res.status(400).json({
        //         success:false,
        //         message:"No products Available",
        //     })
        // }
        // return res.status(200).json({
        //     success:true,
        //     message:"Products fetched Successfully",
        //     pagination:{
        //         page,
        //         limit,
        //         total,
        //         totalPages:Math.ceil(total/limit),
        //         search
        //     },
        //     data:products
        // });
    } catch (error) {
        next(error)
    }
}
export const findProductsById = async(req,res,next)=>{
    try {
        const productId = req.params.productId;

        const product = await Product.findById(productId).populate('category','name subName');
        if(!product){
            return res.status(400).json({
                success:false,
                message:"No produst found",
                data:product
            })
        }
        const relatedProducts = await Product.find({
            category:product.category._id,
            _id:{$ne:productId}
        }).select('name price brand description delivery')
        if(!relatedProducts){
            return res.status(400).json({
                success:false,
                message:"No related Products"
            })
        }
        return res.status(200).json({
            success:true,
            message:"View Single product Successfully",
            product,
            relatedProducts
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