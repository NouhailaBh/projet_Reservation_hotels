import axios from "axios";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "./VoirUneRoom.css";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
const VoirUneRoom = () => {
  const [room, setRoom] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const roomId = searchParams.get('room');
  const hotelId = searchParams.get('hotel');

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
                    showThumbs={false}
                    showArrows={true}
                    renderArrowPrev={renderArrowPrev}
                    renderArrowNext={renderArrowNext}
                  >
                    {room.photos.map((photo, index) => (
                      <div key={index}>
                        <img src={photo} alt={`Room photo ${index}`} />
                      </div>
                    ))}
                  </Carousel>
                </div>
              </div>
            ) : (
              <p>No images available for this room.</p>
            )}
          </div>
        ) : (
          <p>Loading room...</p>
        )}
      </header>
       
        <div class="container px-4 px-lg-5">
            <div class="row gx-4 gx-lg-5 justify-content-center">
                <div class="col-md-10 col-lg-8 col-xl-7">
             
                    <div class="post-preview">
                        
                            <h2 class="text text-center">{room.title}</h2>
                    </div>
                    <hr class="my-4" />
                    <div class="post-preview">
                        
                        <h2 class="text text-center">  {room.desc}</h2>
                </div>
                  
                   
                    <hr class="my-4" />
                  
                    <div class="post-preview">
                <h3 class="text text-center">Max de personnes :{room.maxPeople}</h3>
                       
                    </div>
                   
                    <hr class="my-4" />
                 
                    <div class="post-preview">
                        
                            <h2 class="text text-center">${room.price}</h2>
                       
                    </div>
                    <hr class="my-4" />
                  
                  <div class="post-preview">
              <h2 class="text text-center">  {room.numeroRoom}</h2>
                     
                  </div>
                  <hr class="my-4" />  
            
                    <div class="d-flex justify-content-end mb-4"><Link class="btn btn-primary text-uppercase" to={`/rooms?id=${hotelId}`}>Retourner Pour Réserver</Link></div>
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

export default VoirUneRoom;
