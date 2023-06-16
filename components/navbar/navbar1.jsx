import { Link } from "react-router-dom";
import "./navbar.css";
import { useContext } from "react";
import { BoxArrowInRight } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextHost } from "../../context/AuthContextHost"; 

const Navbar = () => {
  const { host, loading, error, dispatch } = useContext(AuthContextHost);

  const handleLogOut = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
  
    localStorage.removeItem("adminId");
  };

  return (
    <div className="navbar1">
      <div className="navContainer">
        {host ? (
          <button className="headerBtn" onClick={handleLogOut}>
            <BoxArrowInRight /> Log out
          </button>
        ) : (
          <div className="navItems">
            <Link to="/loginHost">
              <button className="navButton">login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
