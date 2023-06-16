import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import {useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContextHost } from "../context/AuthContextHost";
import { useNavigate } from "react-router-dom";
import {StarFill} from "react-bootstrap-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {ArrowUpCircleFill} from "react-bootstrap-icons";

const HotelList = ({ hotels,adminId}) => {
   const navigate = useNavigate();
   const [cityFilter, setCityFilter] = useState("");
   const [nameFilter, setNameFilter] = useState("");
   
   const location = useLocation();
   const {host,dispatch} =useContext(AuthContextHost);
   const [loggedIn, setLoggedIn] = useState(true); 
   const scrollToBanner = () => {
      const banner = document.getElementById('banner_slider');
      banner.scrollIntoView({ behavior: 'smooth' });
    };
   const handleLogOut = () => {
      dispatch({ type: "LOGOUT" });
      sessionStorage.removeItem("adminId");
      setLoggedIn(false); 
      navigate("/loginHost");
    };
    const handleProfile = () => {
      navigate("/hostPage");
    };
    const handleDeleteConfirmation = (hotelId) => {
      const confirmDelete = window.confirm("Voulez vous vraiment supprimer ce hotel ?");
      if (confirmDelete) {
        navigate(`/delete-hotel/?id=${hotelId}`);
      }
    };
    
   const path = location.pathname;
   const [list, setList] = useState([]);
   const { data, loading, error } = useFetch(path);
   useEffect(() => {
      const adminId = sessionStorage.getItem("adminId");
      if (!adminId) {
        setLoggedIn(false); 
        navigate("/loginHost");
      }
    }, []);
  return (
  
<div>
   {loggedIn ? ( 
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
     
      <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
      
      <link rel="stylesheet" type="text/css" href="css/style.css"/>
     
      <link rel="stylesheet" href="css/responsive.css"/>
     
      <link rel="icon" href="images/fevicon.png" type="image/gif" />
  
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap" rel="stylesheet"/>
   
      <link rel="stylesheet" href="css/jquery.mCustomScrollbar.min.css"/>
      
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
                          
                           </div>
                          
                        </div>
                     </div>
                     <div className="carousel-item">
                        <div className="row">
                           <div className="col-md-6">
                              <div className="banner_img"><img src="images/banner-img.png"/></div>
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
     
      <div className="coffee_section layout_padding">
  <div className="container">
    <div className="row">
      <h1 className="coffee_taital">les hotels</h1>
      
      <div className="readmore_btn">
        <Link to={`${location.pathname}/new`} className="link" style={{marginLeft:'480px'}}>
         
          <h2>nouveau Hotel</h2>
        </Link>
      </div> 
      <div className="bulit_icon">
       
        <div className="bulit_icon" style={{ display: 'flex', alignItems: 'center',marginTop:'20px' }}>
        <input
            type="text"
            placeholder="Filter vos hotels par la ville"
            value={cityFilter}
            onChange={e => setCityFilter(e.target.value)}
            className="form-control input-sm"
          />
          <input
            type="text"
            placeholder="Filter vos hotels par son nom"
            value={nameFilter}
            onChange={e => setNameFilter(e.target.value)}
            className="form-control input-sm"

          /></div> 
      </div>
    </div>
  </div>
  <div className="coffee_section_2" >
    <div id="main_slider" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="">
            <div className="row">
              {hotels &&
              hotels
                .filter(hotel =>
                  hotel.city.toLowerCase().includes(cityFilter.toLowerCase()) &&
                  hotel.name.toLowerCase().includes(nameFilter.toLowerCase())
                )
                .map(hotel => (
                  <div className="col-lg-6 col-md-9" key={hotel._id} style={{marginTop:'40px'}}>
                    <div className="blog_box">
                      {hotel.photos && hotel.photos.length > 0 ? (
                        <div className="">
                          <img src={hotel.photos[0]} />
                        </div>
                      ) : (
                        <p>No images available for this hotel.</p>
                      )}
                      <h3 className="" style={{marginTop:'10px'}}><strong>{hotel.name}</strong></h3>
                      <div  style={{textAlign: 'left',marginLeft:'30px'}}> 
                       <h3 style={{textAlign: 'left' ,marginLeft:'20px'}}>{hotel.title}</h3>
                      <p className="looking_text" style={{textAlign: 'left' ,marginLeft:'20px'}}>ville: {hotel.city}</p>
                      <p className="looking_text" style={{textAlign: 'left',marginLeft:'20px'}}>localisation : {hotel.address}</p>
                      <p className="looking_text" style={{textAlign: 'left',marginLeft:'20px'}}>description :{hotel.desc}</p>
                      <p className="looking_text" style={{textAlign: 'left',marginLeft:'20px'}}>loin de :{hotel.distance} m de centre ville</p>
                      <p className="looking_text" style={{textAlign: 'left',marginLeft:'20px'}}>prix inférieur :{hotel.cheapestPrice}</p>
                      <p className="looking_text" style={{textAlign: 'left',marginLeft:'20px'}}>
  Rating:
  {Array.from({ length: hotel.rating }, (_, index) => (
     <StarFill key={index} size={25} style={{color: '#dae907'}}/>
  ))}
</p></div>
                      <div className="container-fluid"></div>
                      <div style={{ marginLeft: '60px' }} className="read_bt5">
                        <Link style={{ marginRight: '10px' }} to={`/view-rooms/?id=${hotel._id}`}>
                          Voir Chambres
                        </Link>
                        <Link
                          style={{ marginRight: '10px' }}
                          to={`/view-reservations/?id=${hotel._id}`}
                        >
                          Voir Reservations
                        </Link>
                        <Link
                          className="read_bt"
                          style={{ marginRight: '10px' }}
                          to={`/modify-hotel/?id=${hotel._id}`}
                        >
                          Modifier Hotel
                        </Link>
                        <button
                          style={{
                           textAlign : 'center' ,  fontSize:'20px', width: '100%',
                           float: 'left',
                           fontSize: '16px',
                            margin: '0 auto',
                            borderRadius: '5px',
                            textTransform: 'uppercase',
                            textAlign: 'center',
                            backgroundColor: 'white',
                            paddingTop: '20px',
                            display: 'flex',
                            color: '#d78373',
                            border: '1px solid #d78373',
                            padding: '8px'
                          }}
                          className="read_bt1"
                          onClick={() => handleDeleteConfirmation(hotel._id)}
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                
                ))}  <p style={{marginTop:'20px'}}></p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</div>

   
    
      <button onClick={scrollToBanner} style={{backgroundColor:'white'}}>
       
       <ArrowUpCircleFill size={70} style={{ right: '20px',marginLeft:'1270px',
        color:'#7e74b6' }} />
    
   </button>
   
      <div className="footer_section layout_padding" style={{marginTop:'50px'}}>
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
     
      <script src="js/jquery.min.js"></script>
      <script src="js/popper.min.js"></script>
      <script src="js/bootstrap.bundle.min.js"></script>
      <script src="js/jquery-3.0.0.min.js"></script>
      <script src="js/plugin.js"></script>
     
      <script src="js/jquery.mCustomScrollbar.concat.min.js"></script>
      <script src="js/custom.js"></script>
   </body>
</div>
     ) : (
    navigate( "/loginHost")
    )}
  </div>
);
};

export default HotelList;


