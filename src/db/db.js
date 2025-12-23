import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const connect = await mongoose.connect(
            process.env.MONGO_URI
        )
        console.log('MongoDb Connected successfully');
    } catch (error) {
        console.log("MongoDb Connection failed",error); 
    }
}
export default connectDB