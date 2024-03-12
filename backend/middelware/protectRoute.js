import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute=async(req,res,next)=>{
    try{
      const token=req.cookies.jwt;
      if(!token)
      {
        return res.status(401).json({error:"Unauthorized Token"});
      }

      const decode=jwt.verify(token,process.env.JWT_Secrate);

      if(!decode)
      {
        return res.status(401).json({error:"Unauthorized Token but not decoded"});
      }
      const user=await User.findById(decode.userId).select("-password");

      if(!user)
      {
        return res.status(404).json({error:"user not found"});
      }

      req.user=user;

      next();

    }catch(error){
        console.log("protect errpr message",error.message);
        return res.status(500).json({error:"Internal protectRoute error"});
    }
}

export default protectRoute;