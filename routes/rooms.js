import express from 'express';
import { createRoom ,getRooms,deleteRoom,updateRoom,deleteRoomPhoto,uploadRoomPhoto,getRoom} from '../controllers/room.js';

const router = express.Router();


router.post("/", createRoom);
router.get("/:id",getRoom);
router.get("/",getRooms);
router.delete("/:id",deleteRoom);
router.put("/:id",updateRoom);
router.delete('/:roomId/photos/:photoIndex', deleteRoomPhoto);
router.post("/:roomId/photos", uploadRoomPhoto);

export default router;
