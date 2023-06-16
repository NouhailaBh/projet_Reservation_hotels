import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Facture.css';
import { Printer } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
const Facture = () => {
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [reservation, setReservation] = useState(null);
  const userId = sessionStorage.getItem('userId');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const roomId = searchParams.get('room');
  const reservationId = searchParams.get('reservation');
const navigate=useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:4001/api/users/${userId}`);
        setUser(userResponse.data);

        const roomResponse = await axios.get(`http://localhost:4001/api/rooms/${roomId}`);
        setRoom(roomResponse.data);

        const hotelResponse = await axios.get(`http://localhost:4001/api/hotels/find/${roomResponse.data.hotel}`);
        setHotel(hotelResponse.data);

        const reservationResponse = await axios.get(`http://localhost:4001/api/reservations/${reservationId}`);
        setReservation(reservationResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [userId, roomId, reservationId]);

  const handlePrint = () => {
    window.print();
  };
  
  const handleRetour = () => {
    navigate('/');
  };
  return (
    <div className="card1">
      <link rel="stylesheet" type="text/css" href="./Facture.css" media="print" />
      <div className="card-body">
        <div className="container mb-5 mt-3">
          <div className="row d-flex align-items-baseline">
            <div className="col-xl-9">
            <p style={{ color: '#7e8d9f', fontSize: '20px' }}>#Numéro Réservation <strong>: {reservation && reservation.numR}</strong></p>
            </div>
            <div className="col-xl-3 float-end"></div>
          </div>

          <div className="container">
            <div className="col-md-12">
              <div className="text-center">
                <i className="fab fa-mdb fa-4x ms-0" style={{ color: '#5d9fc5' }}></i>
                <p className="pt-0">Facture Réservation </p>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-8">
                {user && (
                  <ul className="list-unstyled">
                    <li className="text-muted">To: <span style={{ color: '#5d9fc5' }}>{user.username}</span></li>
                    <li className="text-muted">{user.email}</li>
                  </ul>
                )}
              </div>

              {hotel && (
                <div className="col-xl-4">
                  <p className="text-muted">{hotel.name}</p>
                  <ul className="list-unstyled">
                    <li className="text-muted">
                      <i className="fas fa-circle" style={{ color: '#84B0CA' }}></i>
                      <span className="fw-bold">{hotel.address}</span>
                    </li>
                    <li className="text-muted">
                      <i className="fas fa-circle" style={{ color: ' #84B0CA' }}></i> <span className="fw-bold">ville :</span>
                      {hotel.city}
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="row my-2 mx-1 justify-content-center">
              <table className="table table-striped table-borderless">
                <thead style={{ backgroundColor: '#84B0CA' }} className="text-white">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Numéro chambre</th>
                    <th scope="col">Nom du chambre</th>
                    
                    <th scope="col">Description</th>
                    <th scope="col">Prix d'une nuit</th>
                  </tr>
                </thead>
                <tbody>
                  {room && (
                    <tr>
                      <th scope="row">1</th>
                       <td>{room.numeroRoom}</td>
                      <td>{room.title}</td>
                      <td>{room.desc}</td>
                      <td>{room.price}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {reservation && (
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
                          Math.ceil((new Date(reservation.endDate) - new Date(reservation.startDate)) / (1000 * 60 * 60 * 24))}
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
            )}
          

            <div className="row">
              <div className="col-xl-10">
                <p></p>
              </div>
              <div className="col-xl-2">
              <button
  type="button"
  className="btn btn-primary text-capitalize print-button"
  style={{ backgroundColor: '#60bdf3' }}
  onClick={handlePrint}
>
  <Printer /> Imprimer
</button>


              </div>
            </div><button
  type="button"
  className="btn btn-success text-capitalize return-button "
  style={{ backgroundColor: 'green' }}
  onClick={handleRetour}
>
 Retourner
</button>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default Facture;
