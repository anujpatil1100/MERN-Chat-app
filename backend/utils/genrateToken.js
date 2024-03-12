import jwt from "jsonwebtoken";

const generateTokenandSetCooki=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_Secrate,{
        expiresIn:'15d'
    });

    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000, //Ms
        httpOnly:true, //prevent XSS attacks cross script not to use
        sameSite:"strict", // prevent CSRF attack
        secure:process.env.NODE_ENV!=="development"
    })

}

export default generateTokenandSetCooki;