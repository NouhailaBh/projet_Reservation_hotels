import express  from "express";


import { createReservation, getAllReservations,getReservationById,getUserReservations} from "../controllers/reservation.js";

const router = express.Router();

router.post("/", createReservation);
router.get("/", getAllReservations);
router.get('/:reservationId', getReservationById);
router.get('/user/:userId', getUserReservations);



export default router;


