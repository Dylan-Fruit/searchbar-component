import React, { useEffect, useState } from "react";
import "./Departure.scss";

const Departure = () => {
  const [searchCities, setSearchCities] = useState("");
  const [autoCompleteResultsDeparture, setAutoCompleteResultsDeparture] =
    useState([]);
  const [autoCompleteResultsArrival, setAutoCompleteResultsArrival] = useState(
    []
  );
  const [searchArrival, setSearchArrival] = useState("");
  const [departureCity, setDepartureCity] = useState("");
  const [popularCities, setPopularCities] = useState([]);
  const [isArrivalFocused, setIsArrivalFocused] = useState(false);
  const [popularCitiesFromDeparture, setPopularCitiesFromDeparture] = useState(
    []
  );
  const [departureModal, setDepartureModal] = useState(false);
  const [arrivalModal, setArrivalModal] = useState(false);
  const apiLink = "https://api.comparatrip.eu/cities/";

  useEffect(() => {
    if (searchCities) {
      fetch(`${apiLink}autocomplete/?q=${searchCities}`)
        .then((response) => response.json())
        .then((data) => setAutoCompleteResultsDeparture(data))
        .catch((error) => console.log(error));
    } else {
      setAutoCompleteResultsDeparture([]);
    }
  }, [searchCities]);

  useEffect(() => {
    if (searchArrival) {
      fetch(`${apiLink}autocomplete/?q=${searchArrival}`)
        .then((response) => response.json())
        .then((data) => setAutoCompleteResultsArrival(data))
        .catch((error) => console.log(error));
    } else {
      setAutoCompleteResultsArrival([]);
    }
  }, [searchArrival]);

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
  }

  function handleArrivalInput(e) {
    setSearchArrival(e.target.value);
  }

  function handleArrivalBlur() {
    setIsArrivalFocused(false);
  }

  function handleCloseModal() {
    setDepartureModal(false);
    setArrivalModal(false);
  }

  return (
    <div className="DepartureInputs">
      <div className="departureCity">
        <div className="departureSVG">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 4a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
              id="PinStart__a"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          placeholder="De: Ville, Gare Ou Aéroport"
          value={searchCities}
          autoComplete="off"
          autoCorrect="off"
          onChange={handleInputChange}
          id="departureCity"
          onClick={() => setDepartureModal(true)}
        />
      </div>
      <div className="arrivalCity">
        <div className="arrivalSVG">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-8-3a8 8 0 1 1 16 0c0 1.842-1.176 4.053-3.53 6.635L12 22l-4.47-5.365C5.175 14.053 4 11.842 4 10z"
              id="Pin__a"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Vers: Ville, Gare Ou Aéroport"
          value={searchArrival}
          onFocus={handleArrivalFocus}
          onBlur={handleArrivalBlur}
          onChange={handleArrivalInput}
          id="arrivalCity"
          onClick={() => setArrivalModal(true)}
        />
      </div>
      {departureModal && (
        <div className="modal">
          <div className="modalTop">
            <div className="modalTopContent">
              <div className="modalSVG" onClick={() => handleCloseModal()}>
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                >
                  <path
                    d="M9.634 12l7.043 7.043A1.115 1.115 0 1 1 15.1 20.62l-7.777-7.778A1.112 1.112 0 0 1 6.998 12c-.015-.303.093-.61.325-.842L15.1 3.38a1.115 1.115 0 0 1 1.577 1.577L9.634 12z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Ville, Gare Ou Aéroport"
                value={searchCities}
                onChange={handleInputChange}
                id="modalInput"
              />
            </div>
          </div>
          <div className="modalResult">
            {autoCompleteResultsDeparture.length > 0 && (
              <ul>
                {autoCompleteResultsDeparture.map((result) => (
                  <li key={result.local_name}>{result.local_name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      {arrivalModal && (
        <div className="modal">
          <div className="modalTop">
            <div className="modalTopContent">
              <div className="modalSVG" onClick={() => handleCloseModal()}>
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                >
                  <path
                    d="M9.634 12l7.043 7.043A1.115 1.115 0 1 1 15.1 20.62l-7.777-7.778A1.112 1.112 0 0 1 6.998 12c-.015-.303.093-.61.325-.842L15.1 3.38a1.115 1.115 0 0 1 1.577 1.577L9.634 12z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Ville, Gare Ou Aéroport"
                value={searchArrival}
                onChange={handleArrivalInput}
                id="modalInput"
              />
            </div>
          </div>
          <div className="modalResult">
            {autoCompleteResultsArrival.length > 0 && (
              <ul>
                {autoCompleteResultsArrival.map((result) => (
                  <li key={result.local_name}>{result.local_name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {autoCompleteResultsDeparture.length > 0 && (
        <ul>
          {autoCompleteResultsDeparture.map((result) => (
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
