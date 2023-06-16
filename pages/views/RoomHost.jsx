import axios from "axios";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "./VoirUneRoom.css";
import { useContext } from "react";
import { AuthContextHost } from "../../context/AuthContextHost";
import { ArrowRight,ArrowLeft, Image } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
const RoomHost = () => {
  const [room, setRoom] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const roomId = searchParams.get('roomId');
  const hotelId = searchParams.get('id');
    const [selectedFile, setSelectedFile] = useState(null);
    const {host,dispatch} =useContext(AuthContextHost);

    const handleFileInputChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
    const handleUploadPhoto = async (roomId) => {
        if (!selectedFile) {
          return;
        }
      
        try {
          const data = new FormData();
          data.append('file', selectedFile);
          data.append('upload_preset', 'upload');
      
          const uploadRes = await axios.post(
            'https://api.cloudinary.com/v1_1/dcfe1dwkh/image/upload',
            data
          );
      
          const imageUrl = uploadRes.data.url;
      
          await axios.post(`http://localhost:4001/api/rooms/${roomId}/photos`, {
            imageUrl,
          });
      
          fetchRoomDetails();
      
          setSelectedFile(null);
        } catch (error) {
          console.error(error);
       
        }
      };
      
      
      const handleDeletePhoto = async (roomId, photoIndex) => {
        try {
          const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette image ?");
      
          if (!confirmed) {
            return;
          }
      
          await axios.delete(
            `http://localhost:4001/api/rooms/${roomId}/photos/${photoIndex}`
          );
      
          const updatedPhotos = room.photos.filter((photo, index) => index !== photoIndex);
      
          setRoom(prevRoom => ({
            ...prevRoom,
            photos: updatedPhotos
          }));
      
          
          fetchRoomDetails();
        } catch (error) {
          console.error(error);
          
        }
      };
      
      const fetchRoomDetails = () => {
        axios
          .get(`http://localhost:4001/api/rooms/${roomId}`)
          .then((response) => {
            setRoom(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };
      
      useEffect(() => {
        fetchRoomDetails();
      }, [roomId]);
      
  useEffect(() => {
   
    axios.get(`http://localhost:4001/api/rooms/${roomId}`)
      .then(response => {
        setRoom(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [roomId]);

  const renderArrowPrev = (onClickHandler, hasPrev, label) => (
    <Link
      type="button"
      className="carousel-arrow carousel-arrow-prev"
      onClick={onClickHandler}
      disabled={!hasPrev}
      aria-label={label}
    >
     <ArrowLeft/>
    </Link>
  );
  
  const renderArrowNext = (onClickHandler, hasNext, label) => (
    <Link
      type="button"
      className="carousel-arrow carousel-arrow-next"
      onClick={onClickHandler}
      disabled={!hasNext}
      aria-label={label}
    >
    <ArrowRight/>
    </Link>
  );
  


  return (

<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Voir Room</title>
        <link rel="icon" type="image/x-icon" href="../../assets5/favicon.ico" />
       
        <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
       
        <link href="https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800" rel="stylesheet" type="text/css" />
      
        <link href="../../css5/styles.css" rel="stylesheet" />
    </head> {room ? (
    <body>
      
      <header className="">
        {room ? (
          <div className="blog_box" key={room._id}>
           {room.photos && room.photos.length > 0 ? (
  <div>
    <div className="carousel-navigation">
      <Carousel
        showThumbs={false}   showArrows={true}
     
        renderArrowPrev={renderArrowPrev} renderArrowNext={renderArrowNext}
       
      >
        {room.photos.map((photo, index) => (
          <div key={index}>
            <img src={photo} alt={`Room photo ${index}`} />
            <div className="carousel-buttons">
            <button className="btn btn-danger" style={{marginTop:'-500px'}} onClick={() => handleDeletePhoto(room._id, index)}><Image/> Supprimer image</button>
        </div>  </div>
        ))}
      </Carousel>
    </div>
  </div>
) : (
  <p>No images available for this room.</p>
)}


             <div>
             <div>
  <input type="file" className="input-file" onChange={handleFileInputChange} />
 <div className="container"> <button className="btn btn-success" onClick={() => handleUploadPhoto(room._id)} >
   <Image/> Ajouter image
  </button></div>
</div>

        </div>
          </div>
          
        ) : (
          <p>Loading room...</p>
        )}
      </header>
       
        <div class="container px-4 px-lg-5">
            <div class="row gx-4 gx-lg-5 justify-content-center">
                <div class="col-md-10 col-lg-8 col-xl-7">
             
                    <div class="post-preview">
                        
                            <h4 class=""><strong>{room.title}</strong></h4>
                    </div>
                    <hr class="my-4" />
                    <div class="post-preview">
                        
                        <h4 class="">  {room.desc}</h4>
                </div>
                  
                   
                    <hr class="my-4" />
                  
                    <div class="post-preview">
                <h4 class="">Max de personnes :<strong>{room.maxPeople}</strong></h4>
                       
                    </div>
                   
                    <hr class="my-4" />
                 
                    <div class="post-preview">
                        
                            <h4 class=""> Prix :<strong>{room.price}$</strong></h4>
                       
                    </div>
                    <hr class="my-4" />
                  
                  <div class="post-preview">
              <h4 class=""> Numéro de chambre :<strong> {room.numeroRoom}</strong></h4>
                     
                  </div>
                  <hr class="my-4" />  
            
                    <div class="d-flex justify-content-end mb-4"><Link class="btn btn-primary text-uppercase" to={`/view-rooms?id=${hotelId}`}>Retourner</Link></div>
                </div>
            </div>
        </div>

        <footer class="border-top">
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                    <div class="col-md-10 col-lg-8 col-xl-7">
                        <ul class="list-inline text-center">
                            <li class="list-inline-item">
                                <a href="#!">
                                    <span class="fa-stack fa-lg">
                                        <i class="fas fa-circle fa-stack-2x"></i>
                                        <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
                                    </span>
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <a href="">
                                    <span class="fa-stack fa-lg">
                                        <i class="fas fa-circle fa-stack-2x"></i>
                                        <i class="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                                    </span>
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <a href="">
                                    <span class="fa-stack fa-lg">
                                        <i class="fas fa-circle fa-stack-2x"></i>
                                        <i class="fab fa-github fa-stack-1x fa-inverse"></i>
                                    </span>
                                </a>
                            </li>
                        </ul>
                        <div class="small text-center text-muted fst-italic">Copyright &copy;Bourouah Nouhaila</div>
                    </div>
                </div>
            </div>
        </footer>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>

        <script src="../../js5/scripts.js"></script>
    </body> ) : (
              <p>Loading room...</p>
            )}
</html>

  );
};

export default RoomHost;
