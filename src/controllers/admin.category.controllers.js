import Category from "../models/admin.category.model.js"

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