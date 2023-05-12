import React, { useEffect, useState } from "react";
import "./Departure.scss";

const Departure = () => {
  const [searchCities, setSearchCities] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchArrival, setSearchArrival] = useState("");
  const [departureCity, setDepartureCity] = useState("");
  const [autoCompleteResults, setAutoCompleteResults] = useState([]);
  const [popularCities, setPopularCities] = useState([]);
  const [isArrivalFocused, setIsArrivalFocused] = useState(false);
  const [popularCitiesFromDeparture, setPopularCitiesFromDeparture] = useState(
    []
  );
  const apiLink = "https://api.comparatrip.eu/cities/";

  useEffect(() => {
    if (searchCities || searchArrival) {
      const query = searchType === "departure" ? searchCities : searchArrival;
      fetch(`${apiLink}autocomplete/?q=${query}`)
        .then((response) => response.json())
        .then((data) => setAutoCompleteResults(data))
        .catch((error) => console.log(error));
    } else {
      setAutoCompleteResults([]);
    }
  }, [searchCities, searchArrival, searchType]);

  useEffect(() => {
    fetch(`${apiLink}popular/5`)
      .then((response) => response.json())
      .then((data) => setPopularCities(data))
      .catch((error) => console.log(error));
  }, []);

  function handleArrivalFocus() {
    if (departureCity) {
      fetch(`${apiLink}popular/from/${departureCity}/5`)
        .then((response) => response.json())
        .then((data) => setPopularCitiesFromDeparture(data))
        .catch((error) => console.log(error));
    } else {
      setPopularCitiesFromDeparture([]);
    }
    setIsArrivalFocused(true);
  }

  function handleInputChange(e) {
    setDepartureCity(e.target.value);
    setSearchCities(e.target.value);
    setSearchType("departure");
  }

  function handleArrivalInput(e) {
    setSearchArrival(e.target.value);
    setSearchType("arrival");
  }

  function handleArrivalBlur() {
    setIsArrivalFocused(false);
  }

  return (
    <div className="DepartureInputs">
      <div className="departureCity">
        <input
          type="text"
          placeholder="De: Ville, Gare Ou Aéroport"
          value={searchCities}
          onChange={handleInputChange}
          id="departureCity"
        />
      </div>
      <div className="arrivalCity">
        <input
          type="text"
          placeholder="Vers: Ville, Gare Ou Aéroport"
          value={searchArrival}
          onFocus={handleArrivalFocus}
          onBlur={handleArrivalBlur}
          onChange={handleArrivalInput}
          id="arrivalCity"
        />
      </div>
      {autoCompleteResults.length > 0 && (
        <ul>
          {autoCompleteResults.map((result) => (
            <li key={result.local_name}>{result.local_name}</li>
          ))}
        </ul>
      )}
      {popularCities.length > 0 && (
        <div className="Popular">
          <h2>Villes populaires</h2>
          <ul>
            {popularCities.map((city) => (
              <li key={city.local_name}>{city.local_name}</li>
            ))}
          </ul>
        </div>
      )}
      {popularCitiesFromDeparture.length > 0 && isArrivalFocused && (
        <div>
          <h2>Villes populaires au départ de {departureCity}</h2>
          <ul>
            {popularCitiesFromDeparture.map((city) => (
              <li key={city.local_name}>{city.local_name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Departure;
