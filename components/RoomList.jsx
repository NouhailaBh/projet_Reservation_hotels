import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import {useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContextHost } from "../context/AuthContextHost";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const RoomList = ({ rooms, adminId, hotelId, setRooms }) => {
   const navigate = useNavigate();
   const [selectedFile, setSelectedFile] = useState(null);
   const {host,dispatch} =useContext(AuthContextHost);
   const handleFileInputChange = (event) => {
     setSelectedFile(event.target.files[0]);
   };
 
 
   const handleLogOut = async(e) =>{
    e.preventDefault()
    dispatch({type: "LOGOUT"})
    
  }
 
  const handleDeleteConfirmation = (roomId) => {
   const confirmDelete = window.confirm("Are you sure you want to delete this room?");
   if (confirmDelete) {
     navigate(`/delete-room/?roomId=${roomId}&id=${hotelId}`);
   }
 };
   const handleProfile = () => {
      navigate("/hostPage");
    };
 

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
      <div className="header_section2">
      <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
               <a className="navbar-brand"href="" style={{color:"white"}}>Hotels</a>
               <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              
               </button>
               <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ml-auto">
                     <li className="nav-item active">
                     
                     </li>
                     <li className="nav-item">
                     
                     </li>
                     <li className="nav-item">
                     
                     </li>
                  </ul>
                  <form className="form-inline my-2 my-lg-0">
                     <div className="login_bt">
                       <a href="" className=" " style={{color:"white"}} onClick={handleLogOut} >Log out </a>
                       <a href="" className="container " style={{color:"white"}} onClick={handleProfile} >Voir Profile</a>
                         
                           
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
                              <div className="banner_img"><img src="/images/banner-img.png"/></div>
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
     
      
   
     
   
    
      <div className="blog_section layout_padding">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <h1 className="about_taital">Les chambres</h1>
        <div className="bulit_icon">
          <img src="/images/bulit-icon.png" />
        </div>
      </div>
    </div>
    {rooms && rooms.length > 0 ? (
      <div className="row" style={{marginTop: '40px'}}>
        {rooms.map((room) => (
          <div className="col-md-6" key={room._id}>
            <div className="blog_box">
              {room.photos && room.photos.length > 0 ? (
                <div className="row" style={{ display: "flex" }}>
                  <div className="blog_img">
                    <img
                      src={room.photos[0]}
                      alt="Room photo 0"
                      style={{ marginRight: "10px" }}
                    />
                  </div>
                </div>
              ) : (
                <p>No images available for this room.</p>
              )}
              <div className="container">
                <h4 className="prep_text">{room.title}</h4>
                <p className="lorem_text">{room.desc}</p>
                <p className="lorem_text">max de personne: {room.maxPeople}</p>
                <p className="lorem_text">${room.price}</p>
                <p className="lorem_text">Numéro de chambre: {room.numeroRoom}</p>
              </div>
              <div className="read_bt2">
                <Link to={`/modify-room/?roomId=${room._id}&id=${hotelId}`}>
                  Modifier
                </Link>
              </div>
              <div className="read_bt3">
                <Link to={`/roomHost/?roomId=${room._id}&id=${hotelId}`}>
                  Voir
                </Link>
              </div>
              <div className="read_bt1">
                <button style={{  width: '100%',
    float: 'left',
    fontSize: '16px',
    color: '#9c2108',
    textAlign: 'center',
    borderRadius: '5px',
    border: '1px solid #d78373',
    textTransform: 'uppercase',
    padding: '8px',
   backgroundColor:'white'}}
                 
                  onClick={() => handleDeleteConfirmation(room._id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
            <p style={{marginTop:'20px'}}></p>

          </div>
          
        ))}<p style={{marginTop:'20px'}}></p>
      </div>
     
    ) : (
      <p>No rooms available.</p>
    )}
 <p style={{marginTop:'20px'}}></p>
    <div className="row">
      <div className="col-md-12">
        <div className="read_bt3">
          <Link to={`/create-room/?id=${hotelId}&adminId=${adminId}`}>
            Create Room
          </Link>
        </div>
      
   
        <div className="read_bt3">
          <Link to={`/hostels`}>Les hotels</Link>
        </div>
      </div>
    </div>
  </div>
</div>






      <div className="contact_section layout_padding">
         <div className="container">
            <div className="row">
               <div className="col-sm-12">
                  <h1 className="contact_taital"></h1>
                  <div className="bulit_icon"></div>
               </div>
            </div>
         </div>
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
   
      <div className="footer_section layout_padding">
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



