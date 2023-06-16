import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Printer } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const UserReservations = () => {
  const [reservations, setReservations] = useState([]);
  const userId = sessionStorage.getItem('userId');
  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleRetour = () => {
    navigate('/');
  };
  const handlePrint = (reservationId) => {
    navigate(`/reservation/${reservationId}`);
  };
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/api/reservations/user/${userId}`);
        setReservations(response.data);

        const fetchRooms = async () => {
          const roomData = [];
          for (const reservation of response.data) {
            const roomId = reservation.roomId;
            const roomResponse = await axios.get(`http://localhost:4001/api/rooms/${roomId}`);
            const room = roomResponse.data;
            const hotelResponse = await axios.get(`http://localhost:4001/api/hotels/find/${room.hotel}`);
            const hotel = hotelResponse.data;
            roomData.push({ ...room, hotel });
          }
          setRooms(roomData);
        };

        if (response.data.length > 0) {
          fetchRooms();
        }
      } catch (error) {
        console.error('Failed to fetch reservations:', error);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    if (userId) {
      fetchReservations();
      fetchUser();
    }
  }, [userId]);

  
  

  return (
    <div class="card1" style={{ marginTop: '10px' }}>
      <div class="card-body">
        <div class="container mb-5 mt-3">
          <div class="row d-flex align-items-baseline">
            <div class="col-xl-9">
              <h1 class="text text-center" style={{marginLeft:'200px'}}>Mes Reservations</h1>
            </div>
          </div>
          <div class="container">
            <div class="row mb-3">
              <div class="col"></div>
            </div>
            {reservations.map((reservation, index) => (
              <div key={reservation._id} class="row my-2 mx-1 justify-content-center">
                {rooms[index] && (
                  <div>
                    <div class="row">
                      <div class="col-xl-8">
                        {user && (
                          <ul class="list-unstyled">
                            <li class="text-muted">To: <span style={{ color: '#5d9fc5' }}>{user.username}</span></li>
                            <li class="text-muted">{user.email}</li>
                          </ul>
                        )}
                      </div>
                      <div class="col-xl-4">
                        <p class="text-muted">{rooms[index].hotel.name}</p>
                        <ul class="list-unstyled">
                          <li class="text-muted">
                            <i class="fas fa-circle" style={{ color: '#84B0CA' }}></i>
                            <span class="fw-bold">{rooms[index].hotel.address}</span>
                          </li>
                          <li class="text-muted">
                            <i class="fas fa-circle" style={{ color: ' #84B0CA' }}></i> <span class="fw-bold">ville :</span>
                            {rooms[index].hotel.city}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <table class="table table-striped table-borderless">
                      <thead style={{ backgroundColor: '#84B0CA' }} class="text-white">
                        <tr>
                          <th scope="col">#Réservation</th>
                          <th scope="col">Room Number</th>
                          <th scope="col">Nom du chambre</th>
                          <th scope="col">Prix pour une nuit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <>
                            <td>{reservation.numR}</td>
                            <td>{rooms[index].numeroRoom}</td>
                            <td>{rooms[index].title}</td>
                            <td>{rooms[index].price}</td>
                          </>
                        </tr>
                      </tbody>
                    </table>
                    <div class="row">
                      <div class="col-xl-8">
                        <p>Date début réservation: {new Date(reservation.startDate).toLocaleDateString()}</p>
                        <p>Date fin réservation: {new Date(reservation.endDate).toLocaleDateString()}</p>
                      </div>
                      <div class="col-xl-10">
                        <ul class="list-unstyled">
                          <li class="text-muted ms-3 mt-2">
                            <span class="text-black me-4">Nombre de jours</span>
                            {Math.ceil(
                              (new Date(reservation.endDate) - new Date(reservation.startDate)) / (1000 * 60 * 60 * 24)
                            )}
                          </li>
                          <li class="text-muted ms-3">
                            <span class="text-black me-4">Total :</span>
                            <span style={{ fontSize: '25px' }}>
                              {rooms[index].price *
                                Math.ceil(
                                  (new Date(reservation.endDate) - new Date(reservation.startDate)) /
                                    (1000 * 60 * 60 * 24)
                                )}
                              $
                              {reservation.statut === 'non payé' && (
                                <li class="text-muted ms-3 mt-2">
                                  <i class="fas fa-circle" style={{ color: '#84B0CA' }}></i>
                                  <span class="badge bg-warning text-black fw-bold">{reservation.statut}</span>
                                </li>
                              )}
                              {reservation.statut === 'payé' && (
                                <li class="text-muted">
                                  <i class="fas fa-circle" style={{ color: '#84B0CA' }}></i>
                                  <span class="badge bg-success text-white fw-bold">{reservation.statut}</span>
                                </li>
                              )}
                            </span>
                          </li>
                        </ul>
                      </div>  <div class="col-xl-3 float-end">
                      <button
                        type="button"
                        class="btn btn-primary text-capitalize print-button"
                        style={{ backgroundColor: '#60bdf3', marginLeft: '500px' }}
                        onClick={() => handlePrint(reservation._id)}
                      >
                      
                        voir Reservation
                      </button>
                    </div>
                    </div>
                  
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            class="btn btn-success text-capitalize "
            style={{ backgroundColor: 'green', marginLeft: '60px' }}
            onClick={handleRetour}
          >
            Retourner
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserReservations;
