import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteHotel = () => {
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const adminId = sessionStorage.getItem('adminId');
  const hotelId = searchParams.get("id");
  const navigate = useNavigate();

  const deleteHotel = async () => {
    try {
      await axios.delete(`http://localhost:4001/api/hotels/${hotelId}`);
      console.log("Hotel deleted successfully.");
      navigate(`/hostels?`);
    } catch (error) {
      console.error("Error deleting hotel:", error);
     
    }
  };

  useEffect(() => {
    deleteHotel();
  }, []);

  return null;
};

export default DeleteHotel;
