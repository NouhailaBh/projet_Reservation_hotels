import express  from "express";
import {getUser,getUsers} from "../controllers/user.js";

import dotenv from 'dotenv';
dotenv.config();
const router=express.Router();



   //get
   router.get("/:id",getUser);

   //get all
   router.get("/",getUsers);

export default router