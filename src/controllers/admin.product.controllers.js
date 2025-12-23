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

        const products = await Product.find()

        return res.status(200).json({
            success:true,
            message:"All products Fetched Successfully",
            data:products
        })
    } catch (error) {
        next(error)
    }
}

export const getProductsByCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;

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
