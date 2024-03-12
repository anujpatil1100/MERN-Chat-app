import User from "../models/user.model.js";

export const getUsersForSidebar=async(req,res)=>{
    try{
       const loggedin=req.user._id;

       const fillterUsers=await User.find({_id:{$ne:loggedin}}).select("-password");

       res.status(200).json(fillterUsers);

    }catch(error){
        console.log("Error from getUsersForSidebar",error.message);
        res.status(500).json({error:"Error from getUsersForSidebar"});
    }
}