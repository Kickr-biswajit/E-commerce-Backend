import Category from "../models/admin.category.model.js"
import Product from "../models/admin.product.model.js"

export const addCategory = async(req,res)=>{
    try {
        const {name}=req.body
        if(!name){
            return res.status(400).json({
                success:false,
                message:"Category Name is Required"
            })
        }

        const existingCategory = await Category.findOne({name})
        if(existingCategory){
            return res.status(400).json({
                success:false,
                message:"This category Names is Already exist"
            })
        }
        
        const category = await  Category.create({name})
        return res.status(201).json({
            success:true,
            message:"Category created successfully",
            data:category
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Server error in addCategory"
        })
    }
}
export const getMyCategory = async(req,res)=>{
    try {
        const category = await Category.find()
        
        return res.status(200).json({
            success:true,
            message:"All Category fetched Successfully",
            data:category
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Server error in getMyCategoryy"
        })
    }
}

export const getMyCategoryById = async(req,res,next)=>{
    try {
        const categoryId = req.params.categoryId;

        const category = await Category.findById(categoryId);
        if(!category){
            return res.status(400).json({
                success:false,
                message:"Category not Found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Category fetched Successfully",
            data:category
        })
    } catch (error) {
        next(error)
    }
}

export const editCategory = async(req,res,next)=>{
    try {
        const categoryId = req.params.categoryId;
        let {name} = req.body || {};
        
       const category = await Category.findByIdAndUpdate(categoryId,
        {new:true}
       );
       if(!category){
        return res.status(400).json({
            success:false,
            message:"No category Found"
        })
       };
       
       if(name) category.name = name;
        
       await category.save();

        return res.status(200).json({
            success:true,
            message:"Category name Updated Sucessfully",
            data:category
        });
    } catch (error) {
        next(error)
    }
}

export const deleteCategory = async(req,res,next)=>{
    try {
        const categoryId = req.params.categoryId;

        const category = await Category.findByIdAndDelete(categoryId);
        console.log('///product delet successfully',category);
        

        if(!category){
            return res.status(400).json({
                success:false,
                message:"No category found"
            })
        };

        const product = await Product.deleteMany({category:categoryId});


        return res.status(200).json({
            success:true,
            message:"Category Deleted Successfully",
            data:category,product
        })
    } catch (error) {
        next(error)
    }
}