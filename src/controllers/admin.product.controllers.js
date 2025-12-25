import Category from "../models/admin.category.model.js";
import Product from "../models/admin.product.model.js";
import error from "../utils/utils.js";

export const addProduct = async(req,res)=>{
    try {
        const adminId = req.admin.id;
        const {
            name,
            description,
            price,
            images,
            brand,
            minimumAge,
            highlights,
            stock,
            delivery,
            category
        } = req.body;
        
        if(!name || !price || !brand || !category || !highlights){
            return res.status(400).json({
                success:false,
                message:"All Fields are Required"
            });
        };
        const categoryExists = await Category.findById(category)
        if(!categoryExists){
            console.log('Products are',categoryExists);
            
            return res.status(400).json({
                success:false,
                message:"Category Doesnot Exist"
            })
        }
        const product = await Product.create({
            name,
            description,
            price,
            images,
            brand,
            minimumAge,
            highlights,
            stock,
            delivery,
            category,
            createdBy:adminId
        });
        return res.status(201).json({
            success:true,
            message:"Products Created Successfully",
            data:product
        });
    } catch (error) {
        next(error)
    }
}
export const getMyProducts = async(req,res,next)=>{
    try {
        const { search } = req.query;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page-1)*limit;

        const query ={};
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const total = await Product.countDocuments(query);

        const products = await Product.find(query)
                                .populate('category','name')
                                .sort({createdAt:-1})
                                .skip(skip)
                                .limit(limit);
                                
        return res.status(200).json({
            success:true,
            message:"All products Fetched Successfully",
            pagination:{
                page,
                limit,
                total,
                totalPages:Math.ceil(total/limit)
            },
            data:products
        })
    } catch (error) {
        next(error)
    }
}


export const getMyProductsById = async(req,res,next)=>{
    try {
        const productId = req.params.productId;

        const product = await Product.findById(productId).populate('category','name');
        if(!product){
            return res.status(400).json({
                success:false,
                message:"No products Availale"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Product fetched Successfully",
            data:product
        })
    } catch (error) {
        next(error)
    }
}

export const getProductsByCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;

    const products = await Product.find({ category: categoryId })

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products 
    });

  } catch (error) {
    next(error)
  }
};
export const editProducts = async(req,res,next)=>{
    try {
        const productId = req.params.productId;
         const {name,
                description,
                price,
                
                brand,
                minimumAge,
                highlights,
                stock,
                delivery,
                category
                    
                  } = req.body || {};   
                
            const product = await Product.findByIdAndUpdate(productId);

            if(!product){
                return res.status(400).json({
                    success:false,
                    message:"Product not found"
                })
            }

            if(name) product.name = name;
            if(description) product.description = description;
            if(price) product.price = price;
            // if(images) product.images = images;
            if(brand) product.brand = brand;
            if(minimumAge) product.minimumAge = minimumAge;
            if(highlights) product.highlights = highlights;
            if(stock) product.stock = stock;
            if(delivery) product.delivery = delivery;

            if(category) {
                const categoryExist = await Category.findByIdAndUpdate(category,
                    {new:true}
                );
                if(!categoryExist){
                    return res.status(400).json({
                        success:false,
                        message:"Invalid Category"
                    });
                };
                product.category = category;
            };

            await product.save();   

            return res.status(200).json({
                success:true,
                message:"Products Updated Successfully",
                data:product
            })

    } catch (error) {
        next(error)
    }
}

export const deleteProduct = async(req,res)=>{
    try {
        const productId = req.params.productId;

        const product = await Product.findByIdAndDelete(productId);
        if(!product){
            return res.status(400).json({
                success:false,
                message:"No product found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Product deleted Successsfully",
            data:product
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Server error in deleteProduct"
        })
    }
}