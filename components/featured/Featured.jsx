import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./featured.css";
import {StarFill} from "react-bootstrap-icons";

const Featured = () => {
  const { data, loading, error } = useFetch("/hotels");

  const chunkSize = 3; 

  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const hotelGroups = chunkArray(data, chunkSize); 

  return (
    <div>
      {loading ? (
        "Loading, please wait..."
      ) : (
        <>
          {hotelGroups.map((group, groupIndex) => (
            <div className="featured" key={groupIndex}>
              {group.map((hotel, hotelIndex) => (
                <div className="featuredItem" key={hotelIndex}>
                  <Link to={`/rooms/?id=${hotel._id}`}>
                    <img
                      src={hotel.photos} 
                      alt={hotel.name}
                      className="featuredImg"
                    />
                    <div className="featuredTitles">
                      <h3 style={{ color: "white" }}>{hotel.name}</h3>
                      <h4 style={{ color: "white" }}>{hotel.city}</h4>
                      <p style={{ color: "white" }}>{hotel.description}</p>
                     <div sy> {Array.from({ length: hotel.rating }, (_, index) => (
     <StarFill key={index} size={25} style={{color: '#dae907'}}/>
  ))}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Featured;
