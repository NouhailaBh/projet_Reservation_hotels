import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteRoom = () => {
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const roomId = searchParams.get("roomId");
  const hotelId = searchParams.get("id");
  const navigate = useNavigate();

  const deleteRoom = async () => {
    try {
      await axios.delete(`http://localhost:4001/api/rooms/${roomId}`);
      console.log("Hotel deleted successfully.");
      navigate(`/view-rooms?id=${hotelId}`);

    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  useEffect(() => {
    deleteRoom();
  }, []);

  return null;
};

export default DeleteRoom;
