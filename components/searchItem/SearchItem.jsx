import { Link } from "react-router-dom";
import "./searchItem.css";
import {StarFill} from "react-bootstrap-icons";

const SearchItem = ({item}) => {
  return (
    <div className="searchItem">
      <img
        src={item.photos[0]}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">à {item.distance} m de centre ville</span>
        
        <span className="siFeatures">
        {item.desc}</span>
        
        <p className="looking_text">
  Rating:
  {Array.from({ length: item.rating }, (_, index) => (
     <StarFill key={index} size={25} style={{color: '#dae907'}}/>
  ))}
</p>
      </div>
      <div className="siDetails">
     
        <div className="siDetailTexts">
          <span className="siPrice">Min prix : {item.cheapestPrice}$</span>
 
          
          <Link to={`/rooms/?id=${item._id}`}>
          <button className="siCheckButton" style={{marginTop:'100px'}}>Voir Les chambres</button>
          
      </Link>  
      </div>
      </div>
    </div>
  );
};

export default SearchItem;
