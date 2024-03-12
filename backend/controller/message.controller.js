import  Promise  from "mongoose";
import Conversation from "../models/conversation.module.js";
import Message from "../models/message.module.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage=async(req,res)=>{
try{
    const {message}=req.body;
    const {id:receiverID}=req.params;
    const senderID=req.user._id;

    let conversation = await Conversation.findOne({
        participants:{ $all:[senderID,receiverID]},
    });

    if(!conversation)
    {
        conversation=await Conversation.create({
            participants:[senderID,receiverID]
        })
    }

    const newMessage=new Message({
        senderID,
        receiverID,
        message
    });

    if(newMessage)
    {
        conversation.messages.push(newMessage._id);
    }

    await conversation.save();
    await newMessage.save();

    //socket connections emits..

    const receiverSocketId = getReceiverSocketId(receiverID);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

    res.status(201).json(newMessage);



}catch(error){
    console.log("sendMessage error",error.message)
    return res.status(500).json({error:"sendMessage Internal error"});
}
}

export const getMessage=async(req,res)=>{
    try{
        const { id: userToChatId } = req.params;
		const senderID = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderID, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);

    }catch(error){
        console.log("getMessage error",error.message)
        return res.status(500).json({error:"get Message Internal error"});
    }
}