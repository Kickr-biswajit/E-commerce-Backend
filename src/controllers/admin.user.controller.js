import User from "../models/user.model.js"

export const getAllUsers = async(req,res)=>{
    try {
        const user = await User.find().select('-password');
        if(!user){
            return res.status(400).json({
                success:false,
                messsage:"No user Found"
            })
        };
        return res.status(200).json({
            success:true,
            message:"All User Fetched Successfully",
            data:user
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Server Error in getAllUsers"
        })
    }
};

export const getUsersById = async(req,res)=>{
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User Not Found"
            })
        };
        return res.status(200).json({
            success:true,
            message:"User Fetched Successfully",
            data:user
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Server error in get single User"
        })
    }
}