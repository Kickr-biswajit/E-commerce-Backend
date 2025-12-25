import User from "../models/user.model.js"

export const getAllUsers = async(req,res)=>{
    try {
        const user = await User.find({
            isBlocked:false
        }).select('-password');
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
export const deleteUser = async(req,res,next)=>{
    try {
        const userId = req.params.id;

        const user = await User.findByIdAndDelete(userId);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"No user found"
            })
        };
        return res.status(200).json({
            success:true,
            message:"User Deleted Successfully",
            data:user
        });
    } catch (error) {
        next(error)
    }
}

export const blockUser = async(req,res,next)=>{
    try {
        const userId = req.params.id;

        const user = await User.findByIdAndUpdate(userId);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        user.isBlocked = true;
        await user.save();
        return res.status(200).json({
            success:true,
            message:"User Blocked Successfully",
            data:user
        })

    } catch (error) {
        next(error)
    }
}

export const unblockUser = async(req,res,next)=>{
    try {
        const userId = req.params.id;

        const user = await User.findByIdAndUpdate(userId);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"No Bloked User"
            })
        }
        user.isBlocked = false;
        await user.save();
        return res.status(200).json({
            success:true,
            message:"User UnBlocked Successfully",
            data:user
        })
    } catch (error) {
        next(error)
    }
}
export const getBlockedUsers = async(req,res,next)=>{
    try {
        const blockedUser = await User.find({
            isBlocked:true
        });
        if(!blockedUser){
            return res.status(400).json({
                success:false,
                message:"No blocked user"
            })
        };
        return res.status(200).json({
            success:true,
            message:"Blocked user fetched Successfully",
            data:blockedUser
        });
    } catch (error) {
        next(error);
    }
}