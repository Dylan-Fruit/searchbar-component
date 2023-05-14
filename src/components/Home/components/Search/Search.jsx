import React, { useState } from "react";
import Departure from "./components/Departure/Departure";
import RoundTrip from "./components/RoundTrip/RoundTrip";
import Passengers from "./components/Passengers/Passengers";
import "./Search.scss";
import Calendar from "./components/Calendar/Calendar";

const Search = () => {
  const [returnDate, setReturnDate] = useState(null);

  return (
    <div className="Search">
      <div className="searchContent">
        <div className="topFormContent">
          <RoundTrip setReturnDate={setReturnDate} />
          <Passengers />
        </div>
        <div className="searchForm">
          <form method="POST">
            <Departure />
            <Calendar returnDate={returnDate} />
            <button className="btn">Rechercher</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;
