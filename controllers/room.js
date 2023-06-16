import Room from "../models/Room.js";

export const createRoom = async (req, res, next) => {
  const newRoom = new Room(req.body);
  const imageUrls = req.body.photos; 

  try {
    newRoom.photos = imageUrls; 
    const savedRoom = await newRoom.save();
    res.status(200).json(savedRoom);
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((error) => error.message);
      res.status(400).json({ success: false, errors });
    } else {
      next(err);
    }
  }
};

export const updateRoom = async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;
  const imageUrls = req.body.photos; 

  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      { ...updates, photos: imageUrls }, 
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};


export const deleteRoom = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json("Room has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

export const getRooms = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const rooms = await Room.find({
      ...others,
      price: { $gt: min || 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

export const deleteRoomPhoto = async (req, res, next) => {
  const { roomId, photoIndex } = req.params;

  try {
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: "La pièce n'existe pas" });
    }

    room.photos.splice(photoIndex, 1);
    await room.save();

    res.json({ message: "La photo a été supprimée avec succès" });
  } catch (err) {
    next(err);
  }
};


export const uploadRoomPhoto = async (req, res, next) => {
  const { roomId } = req.params;
  const { imageUrl } = req.body;

  try {
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room does not exist" });
    }

    room.photos.push(imageUrl);
    await room.save();

    res.status(200).json({ message: "Photo uploaded successfully", room });
  } catch (err) {
    next(err);
  }
};
