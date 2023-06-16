import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../newHotel/newhotel.scss";
import { ArrowLeftSquare } from 'react-bootstrap-icons';

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import {useLocation } from "react-router-dom";
const NewRoom = () => {
  const [files, setFiles] = useState("");
  const [image, setImage] = useState(null);
  const [info, setInfo] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hotelId = searchParams.get("id");
  const adminId = sessionStorage.getItem('adminId');

  const handleChange = (e) => {
    if (e.target.id === 'image') {
      setImage(e.target.files[0]);
    } else {
      setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
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
  const handleClick = async (e) => {
    e.preventDefault();
    if (!hotelId) {
      console.log("ID de l'hôtel manquant");
      return;
    }
    try {
      const list =await Promise.all(
        Object.values(files).map(async (file)=>{
         const data = new FormData();
         data.append("file",file);
         data.append("upload_preset","upload");
         const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dcfe1dwkh/image/upload"
         ,data);
         const {url} =uploadRes.data;
         return url;
       }));

      const newRoom = {
        ...info,
        hotel: hotelId,
        photos: list,
      };

      await axios.post("/rooms", newRoom);
      navigate(`/view-rooms?id=${hotelId}`);
   
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <html>
    <head>
      <meta charset="utf-8"/>
      <title>New Room</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      
      <link rel="stylesheet" href="../../fonts3/material-design-iconic-font/css/material-design-iconic-font.min.css"/>
      <link rel="stylesheet" href="../../css3/style.css"/>
    </head>
  
    <body>
  
    <div className="wrapper" style={{backgroundImage: "url('../../images/ifo.jpeg')"}}>
<div className="inner">
  <div className="image-holder" style={{marginTop: "50px"}}>
  <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
             <label htmlFor="image">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                
                <input
                  type="file"
                  id="image"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
    <div className="button-container">
    </div>
  </div>
  <form action="">
    <h2>Ajouter Nouvelle Chambre</h2>
    <div className="form-wrapper">
      
          <input className="form-control"
            id="title"
            type="text"
            placeholder="Titre"
            onChange={handleChange}
            required
          />
         <input className="form-control"
             id="price"
             type="number"
            placeholder="Prix"
             onChange={handleChange}
             required
          />
           <input className="form-control"
            id="maxPeople"
            type="number"
            placeholder="Max People"
            onChange={handleChange}
            required
          />
           <input className="form-control"
             id="numeroRoom"
             type="number"
            placeholder="Numéro de chambre"
             onChange={handleChange}
             required
          />
           <textarea className="form-control"
             id="desc"
             placeholder="Description"
             onChange={handleChange}
             required
          />
    </div>
    <button  onClick={handleClick}>Créer</button>
    <button onClick={handleNavigate} ><ArrowLeftSquare/></button>
    
  </form>
</div>
</div>

      
    </body>
  </html>
  );
};

export default NewRoom;
