import mongoose from "mongoose";
const connectToMongoDB=async ()=>{
    try{
        await mongoose.connect(process.env.mongo_db_uri)
        console.log("sucess");
    }catch(error){
        console.log(error.message);
    }
}

export default connectToMongoDB;