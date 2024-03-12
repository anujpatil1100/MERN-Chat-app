import express from "express";
import { sendMessage,getMessage } from "../controller/message.controller.js";
import protectRoute from "../middelware/protectRoute.js";
const router=express.Router();

router.get("/:id",protectRoute,getMessage);
router.post("/send/:id",protectRoute,sendMessage);

export default router;