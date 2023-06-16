import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftSquare } from 'react-bootstrap-icons';

const ModifiedRoom = ({ rooms, adminId, roomId, hotelId }) => {
  const location = useLocation();
  const [files, setFiles] = useState([]);
  const [room, setRoom] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (rooms && rooms.length > 0) {
      setRoom(rooms[0]);
    }
  }, [rooms]);

  const handleChange = (e) => {
    if (e.target.id === 'image') {
      setFiles(e.target.files);
    } else {
      setRoom((prevRoom) => ({
        ...prevRoom,
        [e.target.name]: e.target.value,
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let updatedRoom = { ...room }; 

      if (files.length > 0) {
        const imageUrls = await Promise.all(
          Array.from(files).map(async (file) => {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "upload");
            const uploadRes = await axios.post(
              "https://api.cloudinary.com/v1_1/dcfe1dwkh/image/upload",
              data
            );
            const imageUrl = uploadRes.data.url;
            return imageUrl;
          })
        );

        updatedRoom = {
          ...updatedRoom,
          photos: imageUrls,
        };
      }
  
      await axios.put(`http://localhost:4001/api/rooms/${roomId}`, updatedRoom);
      navigate(`/view-rooms?id=${hotelId}`);
    } catch (error) {
      setError(error);
    }
  };
  

  const handleNavigate = async (e) => {
    e.preventDefault();
    try {
      navigate(`/view-rooms?id=${hotelId}`);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Modifier Room</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="../../fonts3/material-design-iconic-font/css/material-design-iconic-font.min.css"
        />
        <link rel="stylesheet" href="../../css3/style.css" />
      </head>
      <body>
        <div className="wrapper" style={{ backgroundImage: "url('../../images/ifo.jpeg')" }}>
          <div className="inner">
            <div className="image-holder" style={{ marginTop: "50px" }}>
              {room.photos && room.photos.length > 0 && <img src={room.photos[0]} alt="" />}

              <div className="button-container">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
            </div>
            <form action="">
              <h2>Modifier Chambre</h2>
              <div className="form-wrapper">
                <input
                  className="form-control"
                  id="title"
                  type="text"
                  name="title"
                  onChange={handleChange}
                  value={room.title || ""}
                />
                <input
                  className="form-control"
                  id="price"
                  type="number"
                  name="price"
                  onChange={handleChange}
                  value={room.price || ""}
                />
                <input
                  className="form-control"
                  id="maxPeople"
                  type="number"
                  name="maxPeople"
                  onChange={handleChange}
                  value={room.maxPeople || ""}
                />
                <textarea
                  className="form-control"
                  id="desc"
                  name="desc"
                  type="text"
                  onChange={handleChange}
                  value={room.desc || ""}
                />
              </div>
              <button onClick={handleSubmit}>Modifier</button>
              <button onClick={handleNavigate}><ArrowLeftSquare /></button>
            </form>
          </div>
        </div>
      </body>
    </html>
  );
};

export default ModifiedRoom;
