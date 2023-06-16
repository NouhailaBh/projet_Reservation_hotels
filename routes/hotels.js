import express  from "express";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import { countByCity, createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";


const router=express.Router();

//create
router.post("/",createHotel);
//update
router.put("/:id",updateHotel);

//Delete
router.delete("/:id",deleteHotel);

   //get
   router.get("/find/:id",getHotel);

   //get all
   router.get("/",getHotels);
   router.get("/countByCity",countByCity);

   

export default router;