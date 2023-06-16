import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { Search, StarFill } from "react-bootstrap-icons";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [rating, setRating] = useState(undefined);
  const [hotelName, setHotelName] = useState("");
  const [allItems, setAllItems] = useState([]); // State to store all items

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );

  useEffect(() => {
    if (!loading) {
      setAllItems(data); // Update the allItems state when data is loaded
    }
  }, [data, loading]);

  const handleFilter = () => {
    let filteredItems = data;

    if (rating) {
      filteredItems = filteredItems.filter((item) => item.rating === parseInt(rating));
    }

    if (hotelName) {
      filteredItems = filteredItems.filter((item) =>
        item.name.toLowerCase().includes(hotelName.toLowerCase())
      );
    }

    setAllItems(filteredItems);
  };

  const handleClearFilter = () => {
    setRating(undefined);
    setHotelName("");
    setAllItems(data);
  };

  return (
    <div>
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listFilters">
            <input
              type="text"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              placeholder="Nom de l'hôtel"
              className="form-control"
            /> 
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="form-control"
            >
              <option value="">Tous les hôtels</option>
              <option value="1">
                <span style={{ color: "#dae907" }}>★</span>
              </option>
              <option value="2">
                <span style={{ color: "#dae907" }}>★★</span>
              </option>
              <option value="3">
                <span style={{ color: "#dae907" }}>★★★</span>
              </option>
              <option value="4">
                <span style={{ color: "#dae907" }}>★★★★</span>
              </option>
              <option value="5">
                <span style={{ color: "#dae907" }}>★★★★★</span>
              </option>
            </select>
            <button onClick={handleFilter} style={{ background: 'none', border: 'none' }}>
              <Search size={20} style={{ marginLeft: '50px' }} />
            </button>
           
          </div>

          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {allItems.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
