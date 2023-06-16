import "../newHotel/newhotel.scss";

import axios from "axios";

import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import ModifiedHotel from "../../components/ModifiedHotel";

const ModifyHotel = () => {
 
  const [hotels, setHotels] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hotelId = searchParams.get('id');
  const adminId = sessionStorage.getItem('adminId');



  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:4001/api/hotels");
      setHotels(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const filteredHotels = hotels.filter((hotel) => hotel._id === hotelId);

  return (
    <div>
  <ModifiedHotel hotels={filteredHotels} adminId={adminId} hotelId={hotelId} />
  </div>
  );
};

export default ModifyHotel;
