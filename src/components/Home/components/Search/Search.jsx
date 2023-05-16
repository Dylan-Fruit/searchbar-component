import React, { useState } from "react";
import Toggle from "react-toggle";
import Departure from "./components/Departure/Departure";
import RoundTrip from "./components/RoundTrip/RoundTrip";
import Passengers from "./components/Passengers/Passengers";
import "./Search.scss";
import CalendarComponent from "./components/Calendar/CalendarComponent";

const Search = () => {
  const [returnDate, setReturnDate] = useState(null);
  const [toggleChecked, setToggleChecked] = useState(true);

  return (
    <div className="Search">
      <div className="searchContent">
        <div className="topFormContent">
          <RoundTrip setReturnDate={setReturnDate} />
          <Passengers />
        </div>
        <div className="searchForm">
          <form>
            <Departure />
            <CalendarComponent
              returnDate={returnDate}
              setReturnDate={setReturnDate}
            />
            <button className="btn">Rechercher</button>
          </form>
        </div>
        <div className="toggleBtn">
          <Toggle
            defaultChecked={toggleChecked}
            icons={false}
            onChange={(e) => setToggleChecked(e.target.checked)}
          />
          <span>Trouver un hébergement</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
