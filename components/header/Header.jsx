import {
  faBed,
  
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const userId = sessionStorage.getItem("userId");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  const {user} =useContext(AuthContext);

  
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
const {dispatch} =useContext(SearchContext)

  const handleSearch = () => {
    dispatch({type:"NEW_SEARCH",payload:{destination,dates,options}});
    navigate("/hotels", { state: { destination, dates, options } });
  };
  const handleLogOut = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    sessionStorage.removeItem("userId");
    navigate("/login");
  };
  const handleProfile = () => {
    navigate(`/userPage`);
  };
  const handleReservation = () => {
    navigate(`/userReservations`);
  };
  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <Link to ="/" className="link">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </Link>
           
          </div>   {userId ? (
                <li style={{ color:'black',fontSize: '15px',marginLeft: '500px'}}>
                  <button  className="btn" onClick={handleLogOut}>Log out</button>
                  <button className="btn" onClick={handleProfile}>Voir profile</button>
                  <button className="btn" onClick={handleReservation}>Mes réservations</button>
                </li>
              ) : (
                <li className="nav-item">
                  <Link  className="btn" to="/login" style={{ color:'black',fontSize: '20px',marginLeft: '800px'}} >Log in</Link>
                </li>
              )}
        </div>
     
        {type !== "list" && (
          <> 
          
         
           
  
            <p className="headerDesc">
             
            </p>
         
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Saisir la détination"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            
              
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
