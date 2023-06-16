import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar1 from "../../components/navbar/navbar1";
import HotelList from "../../components/HotelList";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const List2 = () => {
  const [hotels, setHotels] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
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

  const filteredHotels = hotels.filter((hotel) => hotel.adminId === adminId);

  return (
    <div>
    
      <HotelList hotels={filteredHotels} adminId={adminId} />
    </div>
  );
};

export default List2;
