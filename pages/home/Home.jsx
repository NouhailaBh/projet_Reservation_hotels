import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
 const adminId = sessionStorage.getItem('adminId');
    
  const handleAdminClick = () => {
   
    if (adminId) {
      navigate('/hostels'); 
    } else {
      navigate('/loginHost'); 
    }
  };

  return (
    <div>

     
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <a href="" onClick={handleAdminClick}>Poster votre hotel</a>
        <FeaturedProperties/>
        <MailList/>
      </div>
    </div>
  );
};

export default Home;
