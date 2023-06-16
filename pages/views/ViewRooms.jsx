import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import RoomList from "../../components/RoomList";

const ViewRooms = () => {
  const [fetchedRooms, setFetchedRooms] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const adminId = sessionStorage.getItem('adminId');
 
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

  return (
    <div>
      <RoomList
        rooms={filteredRooms}
        adminId={adminId}
        hotelId={hotelId}
        setRooms={setFetchedRooms}
      />
    </div>
  );
};

export default ViewRooms;


