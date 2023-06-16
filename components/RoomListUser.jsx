import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import MapComponent from "./MapComponent";
import {ArrowUpCircleFill} from "react-bootstrap-icons";


const RoomList = ({ rooms, hotelId, setRooms }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { user, dispatch } = useContext(AuthContext);
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();
 

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleInputChange = (event) => {
    setNumberOfPeople(event.target.value);
  };
  const scrollToBanner = () => {
    const banner = document.getElementById('banner_slider');
    banner.scrollIntoView({ behavior: 'smooth' });
  };
  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleStartDateChange = (event) => {
    const selectedStartDate = new Date(event.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedStartDate < today) {

      setStartDate("");
      setEndDate("");
    } else {
      setStartDate(event.target.value);
    }
  };
  

  const handleEndDateChange = (event) => {
    const selectedEndDate = new Date(event.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedEndDate < today) {
      setEndDate("");
    } else {
      setEndDate(event.target.value);
    }
  };
  
  const handleMesReservation = () => {
    navigate(`/userReservations`);
  };
  const handleProfile = () => {
    navigate(`/userPage`);
  };
  const handleLogOut = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    sessionStorage.removeItem("userId");
    navigate("/login");
  };
  const handleReservation = (roomId) => {
    if (startDate === "" || endDate === "") {
      alert("Please enter the reservation date.");
    } else if (new Date(endDate) < new Date(startDate)) {
      alert("End date cannot be before start date.");
    } else {
      navigate(`/reservationPage?room=${roomId}&start=${startDate}&end=${endDate}`);
    }
  };
  
  const filteredRooms = rooms.filter((room) => {
    if (numberOfPeople !== "" && room.maxPeople < parseInt(numberOfPeople)) {
      return false;
    }
    if (minPrice !== "" && room.price < parseFloat(minPrice)) {
      return false;
    }
    if (maxPrice !== "" && room.price > parseFloat(maxPrice)) {
      return false;
    }
  
    if (startDate !== "" && endDate !== "") {
      const roomStartDateArray = room.startDate ? room.startDate.map((date) => new Date(date)) : [];
      const roomEndDateArray = room.endDate ? room.endDate.map((date) => new Date(date)) : [];
      const userStartDate = new Date(startDate);
      const userEndDate = new Date(endDate);
  
      let isRoomAvailable = true;
  
      if (roomStartDateArray.length > 0 && roomEndDateArray.length > 0) {
        for (let i = 0; i < roomStartDateArray.length; i++) {
          const roomStartDate = roomStartDateArray[i];
          const roomEndDate = roomEndDateArray[i];
  
          if (
            (roomStartDate <= userStartDate && userStartDate <= roomEndDate) ||
            (roomStartDate <= userEndDate && userEndDate <= roomEndDate) ||
            (roomStartDate <= userEndDate && userEndDate <= roomEndDate && roomStartDate <= userStartDate && userStartDate <= roomEndDate) ||
            (userStartDate <= roomStartDate && roomStartDate <= userEndDate) ||
            (userStartDate <= roomEndDate && roomEndDate <= userEndDate)
          ) {
            isRoomAvailable = false;
            break;
          }
        }
      }
  
      if (!isRoomAvailable) {
        return false;
      }
    }
  
    return true;
  });
  
  
  
  const isReservationValid = startDate !== "" && endDate !== "";
  return (

<div>
   <head>
     
      <meta charset="utf-8"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
   
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="viewport" content="initial-scale=1, maximum-scale=1"/>
     
      <title>hotels</title>
      <meta name="keywords" content=""/>
      <meta name="description" content=""/>
      <meta name="author" content=""/>
     
      <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css"/>
      
      <link rel="stylesheet" type="text/css" href="/css/style.css"/>
     
      <link rel="stylesheet" href="/css/responsive.css"/>
     
      <link rel="icon" href="/images/fevicon.png" type="image/gif" />
  
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap" rel="stylesheet"/>
   
      <link rel="stylesheet" href="/css/jquery.mCustomScrollbar.min.css"/>
      
      <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css"/>
   </head>
   <body>
      <div className="header_section1">
         <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
               <a className="navbar-brand"href="">Hotels</a>
               <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ml-auto">
                     <li className="nav-item active">
                     
                     </li>
                     <li className="nav-item">
                     
                     </li>
                    
                  </ul>
                  <form className="form-inline my-2 my-lg-0">
                     <div className="login_bt">
                     <ul className="navbar-nav ml-auto">
              {userId ? (
                <li className="">
                  <button className="btn" onClick={handleLogOut} style={{marginLeft:'-150px'}}>Log out</button>
                  <button className="btn" onClick={handleProfile}>Voir profile</button>
                  <button className="btn" onClick={handleMesReservation}>Mes réservations</button>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" style={{ color:'black',fontSize: '20px',marginLeft: '50px'}} to="/login">Log in</Link>
                </li>
              )}

                          
                        </ul>
                     </div>
                  </form>
               </div>
            </nav>
         </div>
      
         <div className="banner_section layout_padding">
            <div className="container">
               <div id="banner_slider" className="carousel slide" data-ride="carousel">
                  <div className="carousel-inner">
                     <div className="carousel-item active">
                        <div className="row">
                           <div className="col-md-6">
                              <div className="banner_img"></div>
                           </div>
                          
                        </div>
                     </div>
                     <div className="carousel-item">
                        <div className="row">
                           <div className="col-md-6">
                             
                           </div>
                           <div className="col-md-6">
                              <div className="banner_taital_main">
                                 <h1 className="banner_taital">coffee</h1>
                                 <h5 className="tasty_text">Tasty Of DozeCafe</h5>
                                 <p className="banner_text">more-or-less normal distribution of letters, as opposed to using </p>
                                 <div className="btn_main">
                                    <div className="about_bt"><a href="#">About Us</a></div>
                                    <div className="callnow_bt active"><a href="#">Call Now</a></div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="carousel-item">
                        <div className="row">
                           <div className="col-md-6">
                             
                           </div>
                           <div className="col-md-6">
                              <div className="banner_taital_main">
                                 <h1 className="banner_taital">coffee</h1>
                                 <h5 className="tasty_text">Tasty Of DozeCafe</h5>
                                 <p className="banner_text">more-or-less normal distribution of letters, as opposed to using </p>
                                 <div className="btn_main">
                                    <div className="about_bt"><a href="#">About Us</a></div>
                                    <div className="callnow_bt active"><a href="#">Call Now</a></div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                
               
               </div>
            </div>
         </div>
     
      </div>
     
      <div  className="filter_section layout_padding">
  <div  className="container">
    <div className="row">
      <div className="col-md-4">
        <div style={{marginTop :'20px'}} className="form-group">
          
          <input 
            type="number"
            className="form-control"
            id="numberOfPeople"
            value={numberOfPeople}
            onChange={handleInputChange}
            placeholder="Nombre de personne"
          />
        </div>
      </div>
      <div className="col-md-4">
        <div style={{marginTop :'20px'}} className="form-group">
     
          <input
            type="number"
            step="1"
            className="form-control"
            id="minPrice"
            value={minPrice}
            onChange={handleMinPriceChange}
            placeholder="Min Prix"
          />
        </div>
      </div>
      <div className="col-md-4">
        <div style={{marginTop :'20px'}} className="form-group">
       
          <input
            type="number"
            step="1"
            className="form-control"
            id="maxPrice"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            placeholder="Max Prix"
          />
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <div style={{marginTop :'20px'}} className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
      </div>
      <div className="col-md-6">
        <div style={{marginTop :'20px'}} className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
      </div>
    </div>
  </div>
</div>




<div className="blog_section layout_padding">
  <div className="container">
    <div className="row">
      {filteredRooms.length > 0 ? (
        filteredRooms.map((room) => (
          <div className="col-md-6" key={room._id}>
            <div className="blog_box">
           
  {room.photos && room.photos.length > 0 ? (
    <div>
      <div className="row" style={{ display: "flex" }}>
        {room.photos.map((photo, index) => (
          index === 0 && (
            <div className="blog_img" key={index}>
              <img
                src={photo}
                alt={`Room photo ${index}`}
                style={{ marginRight: "10px" }}
              />
            </div>
          )
        ))}
      </div>
    </div>
  ) : (
    <p>No images available for this room.</p>
  )}
  <h4 className="prep_text">{room.title}</h4>
  <p className="lorem_text">{room.desc}</p>
  <p className="lorem_text">Max de personnes : {room.maxPeople}</p>
  <p className="lorem_text">Prix d'un seule nuit : <strong>${room.price}</strong></p>
  <p className="lorem_text">Numéro de chambre : {room.numeroRoom}</p>
  
  <div className="read_bt">
  
  <button className="btn5" style={{textAlign : 'center' ,  fontSize:'20px', width: '100%',
    float: 'left',
    
    color: '#d78373',
    textAlign: 'center',
    bordeRadius: '5px',
    border: '1px solid #d78373',
    backgroundColor:'white',
    borderRadius: '5px',
    textTransform: 'uppercase',
    padding: '8px',
    ':hover': {
      color: '#3b3b3b',
      border:' 1px solid #3b3b3b',
    },
    }}  onClick={() => handleReservation(room._id)}>Réserver </button> </div>
  <div className="read_bt"> <Link style={{textAlign : 'center' ,display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',  fontSize:'20px', backgroundColor: "white" }}className="read_bt" to={`/voirUneRoom?room=${room._id}&hotel=${hotelId}`}>Voir plus</Link>
    </div>
 

  
    <p style={{marginTop:'20px'}}></p>

            </div>
            <p style={{marginTop:'20px'}}></p>

          </div>
        ))
      ) : (
        numberOfPeople === "" && minPrice === "" && maxPrice === "" ? (
          rooms.map((room) => (
            <div className=" col-md-6" key={room._id}>
              <div className="blog_box">
             
  {room.photos && room.photos.length > 0 ? (
    <div>
      <div className="row" style={{ display: "flex" }}>
        {room.photos.map((photo, index) => (
          index === 0 && (
            <div className="blog_img" key={index}>
              <img
                src={photo}
                alt={`Room photo ${index}`}
                style={{ marginRight: "10px" }}
              />
            </div>
          )
        ))}
      </div>
      <p style={{marginTop:'20px'}}></p>

    </div>
  ) : (
    <p>No images available for this room.</p>
  )}
  <h4 className="prep_text">{room.title}</h4>
  <p className="lorem_text">{room.desc}</p>
  <p className="lorem_text">Max de personnes : {room.maxPeople}</p>
  <p className="lorem_text">${room.price}</p>
  <p className="lorem_text">Numéro de chambre : {room.numeroRoom}</p>
  
  <div className="read_bt">
  <button  style={{textAlign : 'center' ,  fontSize:'20px', width: '100%',
    float: 'left',
    
    color: '#d78373',
    textAlign: 'center',
    bordeRadius: '5px',
    border: '1px solid #d78373',
    backgroundColor:'white',
    borderRadius: '5px',
    textTransform: 'uppercase',
    padding: '8px',
    ':hover': {
      color: '#3b3b3b',
      border:' 1px solid #3b3b3b',
    },
    }} onClick={() => handleReservation(room._id)}>Réserver</button></div>
    <div className="read_bt"><Link style={{textAlign : 'center' ,display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',  fontSize:'20px', backgroundColor: "white" }}className="read_bt" to={`/voirUneRoom?room=${room._id}`}>Voir plus</Link>
    

  </div>

  <p style={{marginTop:'20px'}}></p>

              </div>
              <p style={{marginTop:'20px'}}></p>

            </div>
          ))
        ) : (
          <p>No rooms match the selected filters.</p>
        )
      )}<p style={{marginTop:'20px'}}></p>
    </div>
    
    <div className="read_bt">
    <p style={{marginTop:'20px'}}></p>
    </div>  <div className="read_bt3">
          <Link to={`/`}>Les hotels</Link>
        </div>
  </div>
</div>



<button onClick={scrollToBanner} style={{backgroundColor:'white'}}>
       
       <ArrowUpCircleFill size={70} style={{ right: '20px',marginLeft:'1270px',
        color:'#7e74b6' }} />
    
   </button>
      <div className="contact_section layout_padding">
         <div className="container">
            <div className="row">
               <div className="col-sm-12">
                  <h1 className="contact_taital">Localisation</h1>
                  <div className="bulit_icon"><img src="/images/bulit-icon.png"/></div>
               </div>
            </div>
         </div>
         <MapComponent hotelId={hotelId} />

         <div className="container-fluid">
            <div className="contact_section_2">
               <div className="row">
                  <div className="col-md-12">
                     
                  </div>
                  <div className="map_main">
                     <div className="map-responsive">
                      
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
     
      <div className="footer_section layout_padding" style={{marginTop:'30px'}}>
         <div className="container">
            <div className="row">
               <div className="col-md-12">
                  <h1 className="address_text">Booking App</h1>
                  <p className="footer_text">utiliser notre Application pour Réserver des chambres et poster vos poste en ligne </p>
                  <div className="location_text">
                     <ul>
                        <li>
                           <a href="#">
                           <i className="fa fa-phone" aria-hidden="true"></i><span className="padding_left_10">Booking App</span>
                           </a>
                        </li>
                        <li>
                           <a href="#">
                           <i className="fa fa-envelope" aria-hidden="true"></i><span className="padding_left_10">BookingApp@gmail.com</span>
                           </a>
                        </li>
                     </ul>
                  </div>
                  <div className="form-group">
                     
                  </div>
               </div>
            </div>
         </div>
      </div>
    
      <div className="copyright_section">
         <div className="container">
            <div className="row">
               <div className="col-lg-6 col-sm-12">
                  <p className="copyright_text">2020 All Rights Reserved. Design by BOUROUAH NOUHAILA</p>
               </div>
               <div className="col-lg-6 col-sm-12">
                  <div className="footer_social_icon">
                     <ul>
                        <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                        <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                        <li><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                        <li><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
     
      <script src="/js/jquery.min.js"></script>
      <script src="/js/popper.min.js"></script>
      <script src="/js/bootstrap.bundle.min.js"></script>
      <script src="/js/jquery-3.0.0.min.js"></script>
      <script src="/js/plugin.js"></script>
     
      <script src="/js/jquery.mCustomScrollbar.concat.min.js"></script>
      <script src="/js/custom.js"></script>
   </body>
</div>
 
  );
};

export default RoomList;



