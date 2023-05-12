import React from "react";
import Departure from "./components/Departure/Departure";
import RoundTrip from "./components/RoundTrip/RoundTrip";
import Passengers from "./components/Passengers/Passengers";
import "./Search.scss";
import Calendar from "./components/Calendar/Calendar";

const Search = () => {
  return (
    <div className="Search">
      <div className="searchContent">
        <div className="topFormContent">
          <RoundTrip />
          <Passengers />
        </div>
        <div className="searchForm">
          <form method="POST">
            <Departure />
            <Calendar />
            <button className="btn">Rechercher</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;
