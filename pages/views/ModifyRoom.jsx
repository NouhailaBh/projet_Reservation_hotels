import "../newHotel/newhotel.scss";

import axios from "axios";
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import ModifiedRoom from "../../components/ModifiedRoom";

const ModifyRoom = () => {
 
  const [rooms, setRooms] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const roomId = searchParams.get('roomId');
  const adminId = sessionStorage.getItem('adminId');
  const hotelId = searchParams.get('id');



  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:4001/api/rooms");
      setRooms(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const filteredRooms = rooms.filter((room) => room._id === roomId);

  return (
    <div>
  <ModifiedRoom rooms={filteredRooms} adminId={adminId} roomId={roomId} hotelId={hotelId}/>
  </div>
  );
};

export default ModifyRoom;
