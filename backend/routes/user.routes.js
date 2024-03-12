import express from 'express';
import protectRoute from '../middelware/protectRoute.js';
import { getUsersForSidebar } from '../controller/users.controller.js';

const route=express.Router();

route.get("/",protectRoute,getUsersForSidebar)


export default route