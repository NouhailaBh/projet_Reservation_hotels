import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import {useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContextHost } from "../context/AuthContextHost";
import axios from "axios";


const RoomList = ({ rooms, adminId, hotelId, setRooms }) => {
   const [selectedFile, setSelectedFile] = useState(null);
   const {host,dispatch} =useContext(AuthContextHost);
  
 
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
                  <a className="carousel-control-prev" href="#banner_slider" role="button" data-slide="prev">
                  <i className="fa fa-arrow-left"></i>
                  </a>
                  <a className="carousel-control-next" href="#banner_slider" role="button" data-slide="next">
                  <i className="fa fa-arrow-right"></i>
                  </a>
               </div>
            </div>
         </div>
     
      </div>
     
      
   
     
   
    
      <div className="blog_section layout_padding">
         <div className="container">
            <div className="row">
               <div className="col-md-12">
                  <h1 className="about_taital">Our Blog</h1>
                  <div className="bulit_icon"><img src="/images/bulit-icon.png"/></div>
               </div>
            </div>
            <div className="blog_section_2">
            <div className="row">
  {rooms && rooms.length > 0 ? (
    rooms.map((room) => (
      <div className="col-md-4" key={room._id}>
        {room.photos && room.photos.length > 0 ? (
          room.photos.map((photo, index) => (
            <div className="" key={index}>
             <div className="row" style={{ display: "flex" }}>
  <img src={photo} alt={`Room photo ${index[0]}`} style={{ marginRight: "10px" }} />
  
</div>

            </div>
          ))
        ) : (
          <p>No images available for this room.</p>
        )}
        <h4 className="prep_text">{room.title}</h4>
        <p className="lorem_text">{room.desc}</p>
        <p className="lorem_text">max de personne: {room.maxPeople}</p>
        <p className="lorem_text">${room.price}</p>
        <p className="lorem_text">Numéro de chambre: {room.numeroRoom}</p>
       
        <div className="read_bt">
        <Link
          to={`/delete-room/?roomId=${room._id}&id=${hotelId}`}
        >
          Delete Room
        </Link>
        <Link
          to={`/modify-room/?roomId=${room._id}&id=${hotelId}`}
        >
          Modify Room
        </Link>
        </div>
        <div className="read_bt">
        <Link
          to={`/RoomHost`}
        >
         View Room
        </Link>
        </div>
      </div>
    ))
  ) : (
    <p>No rooms available.</p>
  )}

  <div className="col-md-4">
  
  </div>
</div>
  <div className="read_bt">
      <Link to={`/create-room/?id=${hotelId}&adminId=${adminId}`}>
        Create Room
      </Link>
    </div>
    <div className="read_bt">
      <Link to={`/hostels`}>Les hotels</Link>
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



