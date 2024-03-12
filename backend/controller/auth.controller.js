import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import generateTokenandSetCooki from "../utils/genrateToken.js";

export const login= async (req,res)=>{
    try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenandSetCooki(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullname: user.fullnamen,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const logout=(req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"LoggedOut Sucessfully"})
    }catch(error){
        console.log("Error in logout contrroler",error.message);
        res.status(500).json({error:"logout error"});
    }
}

export const signup= async (req,res)=>{
    try{
        const {fullname,username,password,confirmpassword,gender}=req.body;

        if(confirmpassword!=password)
        {
            return res.status(400).json({error:"password not match"});
        }

        // if(User.findOne({fullname:username})){
        //     return res.status(400).json({error:"already exists"});
        // }

        // console.log(userk)

        //Hash Password here

        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);

        //avtar-placeholder.com to get avtars

        const boyprofilepic=`https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlprofilepic=`https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser=new User({
            fullname:fullname,
            username:username,
            password:hashedpassword,
            gender:gender,
            profilePic : gender==="male" ? boyprofilepic:girlprofilepic
        });

        if(newUser){
        await generateTokenandSetCooki(newUser._id,res)
        await newUser.save();

        res.status(201).json({
            __id:newUser._id,
            fullname:newUser.fullname,
            username:newUser.username,
            profilePic:newUser.profilePic
        })
    }
    else{
        return res.status(400).json({error:"Invalid Data"});
    }
    }catch(error){
        console.log("Error in signup contrroler",error.message);
        res.status(500).json({error:"signup error"});
    }
}