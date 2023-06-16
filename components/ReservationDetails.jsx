import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Printer } from 'react-bootstrap-icons';
import './Facture.css';

const ReservationDetails = () => {
  const [reservation, setReservation] = useState(null);
  const [room, setRoom] = useState(null);
  const [user, setUser] = useState(null); 
  const [hotel, setHotel] = useState(null); 
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/api/reservations/${reservationId}`);
        setReservation(response.data);

        const roomResponse = await axios.get(`http://localhost:4001/api/rooms/${response.data.roomId}`);
        setRoom(roomResponse.data);

        const hotelResponse = await axios.get(`http://localhost:4001/api/hotels/find/${roomResponse.data.hotel}`);
        setHotel(hotelResponse.data);
      } catch (error) {
        console.error('Failed to fetch reservation details:', error);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };

    fetchReservation();
    fetchUser();
  }, [reservationId, userId]);

  const handlePrint = () => {
    window.print();
  };

  const handleRetour = () => {
    navigate('/userReservations');
  };

  if (!reservation || !room || !user || !hotel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card1" style={{ marginTop: '10px' }}>
      <div className="card-body">
        <div className="container mb-5 mt-3">
          <div className="row d-flex align-items-baseline">
            <div className="col-xl-9"> <h1 className="text text-center" style={{marginLeft:'100px'}}>Reservation</h1>
            <p style={{ color: '#7e8d9f', fontSize: '20px' }}>#Numéro Réservation <strong>: {reservation && reservation.numR}</strong></p>
             
            </div>
          </div>
          <div className="container">
            <div className="row mb-3">
              <div className="col"></div>
            </div>
            <div className="row my-2 mx-1 justify-content-center">
              <div>
                <div className="row">
                  <div className="col-xl-8">
                    <ul className="list-unstyled">
                      <li className="text-muted">To: <span style={{ color: '#5d9fc5' }}>{user.username}</span></li>
                      <li className="text-muted">{user.email}</li>
                    </ul>
                  </div>
                  <div className="col-xl-4">
                    <p className="text-muted">{hotel.name}</p>
                    <ul className="list-unstyled">
                      <li className="text-muted">
                        <i className="fas fa-circle" style={{ color: '#84B0CA' }}></i>
                        <span className="fw-bold">{hotel.address}</span>
                      </li>
                      <li className="text-muted">
                        <i className="fas fa-circle" style={{ color: ' #84B0CA' }}></i> <span className="fw-bold">City:</span>
                        {hotel.city}
                      </li>
                    </ul>
                  </div>
                </div>
                <table className="table table-striped table-borderless">
                  <thead style={{ backgroundColor: '#84B0CA' }} className="text-white">
                    <tr>
                      <th scope="col">#Reservation</th>
                      <th scope="col">Room Number</th>
                      <th scope="col">Nom du chambre</th>
                      <th scope="col">Prix pour une nuit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <>
                        <td>{reservation.numR}</td>
                        <td>{room.numeroRoom}</td>
                        <td>{room.title}</td>
                        <td>{room.price}</td>
                      </>
                    </tr>
                  </tbody>
                </table>
                <div className="row">
                  <div className="col-xl-8">
                    <p>Date début réservation: {new Date(reservation.startDate).toLocaleDateString()}</p>
                    <p>Date fin réservation: {new Date(reservation.endDate).toLocaleDateString()}</p>
                  </div>
                  <div className="col-xl-10">
                    <ul className="list-unstyled">
                      <li className="text-muted ms-3 mt-2">
                        <span className="text-black me-4">Nombre de jours</span>
                        {Math.ceil(
                          (new Date(reservation.endDate) - new Date(reservation.startDate)) / (1000 * 60 * 60 * 24)
                        )}
                      </li>
                      <li className="text-muted ms-3">
                        <span className="text-black me-4">Total :</span>
                        <span style={{ fontSize: '25px' }}>
                          {room.price *
                            Math.ceil(
                              (new Date(reservation.endDate) - new Date(reservation.startDate)) /
                                (1000 * 60 * 60 * 24)
                            )}
                          $
                          {reservation.statut === 'non payé' && (
                            <li className="text-muted ms-3 mt-2">
                              <i className="fas fa-circle" style={{ color: '#84B0CA' }}></i>
                              <span className="badge bg-warning text-black fw-bold">{reservation.statut}</span>
                            </li>
                          )}
                          {reservation.statut === 'payé' && (
                            <li className="text-muted">
                              <i className="fas fa-circle" style={{ color: '#84B0CA' }}></i>
                              <span className="badge bg-success text-white fw-bold">{reservation.statut}</span>
                            </li>
                          )}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-3 float-end">
                  <button
                    type="button"
                    className="btn btn-primary text-capitalize print-button"
                    style={{ backgroundColor: '#60bdf3', marginLeft: '15px' }}
                    onClick={handlePrint}
                  >
                    <Printer style={{ marginRight: '5px' }} />
                    Imprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-success text-capitalize return-button"
            style={{ backgroundColor: 'green', marginLeft: '60px' }}
            onClick={handleRetour}
          >
            Returner
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetails;
