import "../pages/newHotel/newhotel.scss";
import { hotelInputs } from "../formSource";
import { ArrowLeftSquare } from 'react-bootstrap-icons';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ModifiedHotel = ({ hotels, adminId ,hotelId}) => {
  const location = useLocation();
  const [files, setFiles] = useState("");
  const [hotel, setHotel] = useState({});
  const navigate = useNavigate();
  const path = location.pathname;
  const [error, setError] = useState(null);

  useEffect(() => {
   
    if (hotels && hotels.length > 0) {
      setHotel(hotels[0]);
    }
  }, [hotels]);

  const handleChange = (e) => {
    if (e.target.id === 'image') {
      setFiles(e.target.files);
    } else {
      setHotel((prevHotel) => ({
        ...prevHotel,
        [e.target.name]: e.target.value,
      }));
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
   
  if (Object.values(hotel).some((value) => value === "")) {
    alert("Remplissez tous les champs !");
    return;
  }

  if (hotel.rating < 1 || hotel.rating > 5) {
    alert("Entrer un nombre d'étoiles (de 1 à 5)");
    return;
  }
    try {
      let updatedHotel = { ...hotel }; // Crée une copie de la pièce existante

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
  
        updatedHotel= {
          ...updatedHotel,
          photos: imageUrls,
        };
      }
  
      await axios.put(`http://localhost:4001/api/hotels/${hotelId}`, updatedHotel);
      console.log(hotel);
      navigate(`/hostels`);
    } catch (error) {
      setError(error);
    }
  };
  const handleNavigate = async (e) => {
    e.preventDefault();
    try {
      navigate(`/hostels`);
    } catch (error) {
      setError(error);
    }
  };

  return (
   
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>Modifier Hotel</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        
        <link rel="stylesheet" href="../../fonts3/material-design-iconic-font/css/material-design-iconic-font.min.css"/>
        <link rel="stylesheet" href="../../css3/style.css"/>
      </head>
    
      <body>
    
      <div className="wrapper" style={{backgroundImage: "url('../../images/ifo.jpeg')"}}>
  <div className="inner">
    <div className="image-holder" style={{marginTop: "100px"}}>
    {hotel.photos && hotel.photos.length > 0 && <img src={hotel.photos[0]} alt="" />}
    <div className="button-container">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
       
        <button onClick={handleNavigate}><ArrowLeftSquare/></button>
      
    </div>
    <form action="">
      <h2>Modifier Hotel</h2>
      <div className="form-wrapper">
        {hotelInputs.map((input) => (
          <div className="" key={input.id}>
          
            <input className="form-control"
              name={input.id}
              onChange={handleChange}
              type={input.type}
              placeholder={input.placeholder}
              value={hotel[input.id] || ""}
            />
          </div>
        ))}

      </div>
      <button onClick={handleSubmit}>Modifier</button>
   
      
    </form>
  </div>
</div>

        
      </body>
    </html>
  );
};

export default ModifiedHotel;
