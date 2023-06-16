import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ViewReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [filterNumR, setFilterNumR] = useState("");
  const [filteredRoomId, setFilteredRoomId] = useState(null); // Nouvel état pour stocker l'ID de la chambre filtrée
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hotelId = searchParams.get("id");
  const [hotel, setHotel] = useState({});

 

  
  useEffect(() => {
    fetchReservations();
    fetchRooms();
    fetchUsers();
    fetchHotel();
  }, [hotelId]);
 const fetchHotel = async () => {
    try {
      const response = await axios.get(`http://localhost:4001/api/hotels/find/${hotelId}`);
      const hotelData = response.data;
      setHotel(hotelData);
    } catch (error) {
      console.log(error);
    }
  };
  
  const fetchReservations = async () => {
    try {
      const response = await axios.get(`http://localhost:4001/api/reservations?hotelId=${hotelId}`);
      const reservationsData = response.data;
      setReservations(reservationsData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:4001/api/rooms");
      const roomsData = response.data;
      setRooms(roomsData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4001/api/users");
      const usersData = response.data;
      setUsers(usersData);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredRooms = rooms.filter((room) => room.hotel === hotelId);
  const getReservationInfo = (roomId) => {
    const roomReservations = reservations.filter((reservation) => reservation.roomId === roomId);
    if (roomReservations.length > 0) {
      const sortedReservations = roomReservations.sort(
        (a, b) => new Date(b.startDate) - new Date(a.startDate)
      );
      return sortedReservations.reduce((reservationsInfo, reservation) => {
        const user = users.find((user) => user._id === reservation.userId);
        if (user && reservation.numR !== null && reservation.numR !== undefined) {
          const startDate = new Date(reservation.startDate).toLocaleDateString();
          const endDate = new Date(reservation.endDate).toLocaleDateString();
          const totalDays = calculateTotalDays(reservation.startDate, reservation.endDate);
          const reservationInfo = {
            numR: reservation.numR.toString(),
            username: user.username,
            email: user.email,
            startDate: startDate,
            endDate: endDate,
            totalDays: totalDays,
            statut: reservation.statut
          };
          return [...reservationsInfo, reservationInfo];
        }
        return reservationsInfo;
      }, []);
    }
    return [];
  };
  

  const calculateTotalDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return totalDays;
  };
  
  
  
  

  const handleFilterNumR = (e) => {
    const filteredReservations = reservations.filter((reservation) =>
      reservation.numR !== undefined &&
      reservation.numR !== null &&
      reservation.numR.toString().includes(e.target.value)
    );

    if (filteredReservations.length > 0) {
      const roomId = filteredReservations[0].roomId;
      setFilteredRoomId(roomId);
    } else {
      setFilteredRoomId(null);
    }

    setFilterNumR(e.target.value);
  };

  return (
   <div><h2 className="text text-center">{hotel.name}</h2>
    <div className="text text-center">
      
      <input type="text" className="search" value={filterNumR} style={{ width: '300px' }} onChange={handleFilterNumR} placeholder="Saisir numéro de réservation" />
      </div>
      {filteredRooms.map((room) => {
        const reservationsInfo = getReservationInfo(room._id);
        const filteredRoomReservations = reservationsInfo.filter((reservation) =>
          reservation.numR !== undefined &&
          reservation.numR !== null &&
          reservation.numR.toString().includes(filterNumR)
        );

        if (filteredRoomId && filteredRoomId !== room._id && filterNumR !== "") {
          return null;
        }

        return (
       
          <html lang="en">
            <head >
              <title>Table 01</title>
              <meta charset="utf-8"/>
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          
            <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,700' rel='stylesheet' type='text/css'/>
          
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
            
            <link rel="stylesheet" href="../../css4/style.css"/>
          
            </head>
             <div key={room._id}>
            <body >
           
            <section class="ftco-section">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-md-4 text-center ">
                  
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="table-wrap"> <h4>Num Chambre :{room.numeroRoom}</h4>
                    {filteredRoomReservations.length > 0 ? (
                      <table class="table">
                       
                        <thead class="thead-primary">
                          <tr>
                          <th>#</th>
                    <th>Client</th>
                    <th>Date de début</th>
                    <th>Date de fin</th>
                    <th> Jours</th>
                    <th>Prix total</th>
                    <th>Statut</th>
                  </tr>
                        </thead>
                        <tbody>
                        {filteredRoomReservations.map((reservation) => (
                    <tr key={reservation.numR}>
                      <td>{reservation.numR}</td>
                      <td>{reservation.username}</td>
                      <td>{reservation.startDate}</td>
                      <td>{reservation.endDate}</td>
                      <td>{reservation.totalDays}</td>
                      <td><strong style={{color:""}}>{reservation.totalDays * room.price}</strong></td>
                      <td style={{ color: reservation.statut === "payé" ? "green" : "red" }}>{reservation.statut}</td>

                    </tr>
                  ))}
               
                        </tbody>
                      </table>
                        ) : (
                          <p></p>
                        )}
                        </div>
                    </div>
                  </div>
                </div>
             
            </section>
          
            <script src="../../js4/jquery.min.js"></script>
            <script src="../../js4/popper.js"></script>
            <script src="../../js4/bootstrap.min.js"></script>
            <script src="../../js4/main.js"></script>
          
            </body>
            </div>
          </html>
          
          
        );
      })}
    </div>
  );
};

export default ViewReservations;
