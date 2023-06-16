import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import RoomListUser from "../../components/RoomListUser";
import Navbar from "../../components/navbar/Navbar";

const Rooms = () => {
  const [fetchedRooms, setFetchedRooms] = useState([]);
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [reservationDuration, setReservationDuration] = useState(1);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hotelId = searchParams.get("id");
  const path = location.pathname;

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:4001/api/rooms");
      setFetchedRooms(response.data);
    } catch (error) {
      console.log(error);
    }
  };

 

  const filteredRooms = fetchedRooms.filter((room) => room.hotel === hotelId);

  const handleReservation = (roomId) => {
 
    console.log("Room reserved:", roomId);
  };

  return (
    <div>
     
   
      <RoomListUser
        rooms={filteredRooms}
        hotelId={hotelId}
        setRooms={setFetchedRooms}
        onReservation={handleReservation}
      />
    </div>
  );
};

export default Rooms;
