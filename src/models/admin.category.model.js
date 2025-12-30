import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },
    subName:{
        type:String,
        required:true,
        trim:true
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
{ timestamps: true }
);
categorySchema.index(
  { name: 1, subName: 1 },
  { unique: true }
);
const Category = mongoose.model("Category", categorySchema);
export default Category;
