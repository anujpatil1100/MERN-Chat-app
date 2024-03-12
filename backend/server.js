import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"
import messagesRoute from "./routes/message.routes.js"
import userRoute from "./routes/user.routes.js"
import connectToMongoDB from "./db/mongoDBconnection.js";
import { app, server } from "./socket/socket.js";

//const app=express();
dotenv.config();
const PORT=process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messagesRoute)
app.use("/api/user",userRoute)

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT,()=>{
    connectToMongoDB();
});