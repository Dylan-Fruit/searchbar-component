import React, { useEffect, useState } from "react";
import isMobile from "is-mobile";
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
  const [isDepartureFocused, setIsDepartureFocused] = useState(false);
  const [popularCitiesFromDeparture, setPopularCitiesFromDeparture] = useState(
    []
  );
  const [departureModal, setDepartureModal] = useState(false);
  const [arrivalModal, setArrivalModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [selectedResultArrival, setSelectedResultArrival] = useState(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

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

  function handleArrivalFocus(e) {
    if (departureCity) {
      fetch(`${apiLink}popular/from/${departureCity}/5`)
        .then((response) => response.json())
        .then((data) => setPopularCitiesFromDeparture(data))
        .catch((error) => console.log(error));
    } else {
      setPopularCitiesFromDeparture([]);
    }
    setIsArrivalFocused(true);
    if (isArrivalFocused && e.target.value > 0) {
      setArrivalModal(true);
    } else {
      setArrivalModal(false);
    }
  }

  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  function handleDepartureFocused(e) {
    if (popularCities) {
      fetch(`${apiLink}popular/5`)
        .then((response) => response.json())
        .then((data) => setPopularCities(data))
        .catch((error) => console.log(error));
    } else {
      setPopularCities([]);
    }
    setIsDepartureFocused(true);
  }

  // Fonction récupérant la valeur entrée dans les input de départ
  function handleInputChange(e) {
    setDepartureCity(e.target.value);
    setSearchCities(e.target.value);

    if (!e.target.value) {
      setDepartureModal(false);
    } else {
      setDepartureModal(true);
      setSelectedResult(null);
    }
  }

  // Fonction récupérant la valeur entrée dans les input d'arrivée
  function handleArrivalInput(e) {
    setSearchArrival(e.target.value);

    if (!e.target.value) {
      setArrivalModal(false);
    } else {
      setArrivalModal(true);
      setSelectedResultArrival(null);
      setPopularCitiesFromDeparture([]);
    }
  }

  function handleCloseModal() {
    setDepartureModal(false);
    setArrivalModal(false);
    setSelectedResult(null); // Réinitialiser le résultat sélectionné pour le départ
    setSelectedResultArrival(null); // Réinitialiser le résultat sélectionné pour le retour
    setDepartureCity("");
  }

  function handleSelectResult(result) {
    setSelectedResult(result);
    setSearchCities(result.local_name);
    setDepartureCity(result.local_name);
    setDepartureModal(false);
  }

  function handleSelectResultArrival(result) {
    setSelectedResultArrival(result);
    setSearchArrival(result.local_name); // Mettre à jour la valeur de l'input d'arrivée
    setArrivalModal(false); // Fermer la modal
  }

  function handleDepartureChange() {
    if (searchCities && searchArrival) {
      const temp = searchCities;
      setSearchCities(searchArrival);
      setSearchArrival(temp);

      // Mettre à jour les valeurs affichées dans les inputs
      setSelectedResultArrival({ local_name: searchCities });
      setSelectedResult({ local_name: searchArrival });
    }
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
          value={selectedResult ? selectedResult.local_name : searchCities}
          onFocus={handleDepartureFocused}
          onChange={handleInputChange}
          id="departureCity"
          onClick={isMobileDevice ? () => setDepartureModal(true) : null}
        />
        <div className="overflowHide">
          <div className="overflowHide2"></div>
        </div>
        <div className="departureChangeSVG" onClick={handleDepartureChange}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.632 5.763L3.757 8.961a.978.978 0 0 1-1.454 0 1.21 1.21 0 0 1 0-1.618l4.499-5.005a1 1 0 0 1 1.487 0l4.397 4.892a1.21 1.21 0 0 1-.073 1.691.978.978 0 0 1-1.38-.073l-2.58-2.869v11.017a1 1 0 0 1-1 1h-.021a1 1 0 0 1-1-1V5.763zm11.022 12.261l2.578-2.868a.978.978 0 0 1 1.454 0 1.21 1.21 0 0 1 0 1.617l-4.397 4.892a1 1 0 0 1-1.487 0l-4.499-5.005a1.21 1.21 0 0 1 0-1.618.978.978 0 0 1 1.454 0l2.875 3.198V7.007a1 1 0 0 1 1-1h.022a1 1 0 0 1 1 1v11.017z"
              id="Swapper__a"
            ></path>
          </svg>
        </div>
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
          value={
            selectedResultArrival
              ? selectedResultArrival.local_name
              : searchArrival
          }
          onFocus={handleArrivalFocus}
          onBlur={() => setArrivalModal(false)}
          onChange={handleArrivalInput}
          id="arrivalCity"
          onClick={isMobileDevice ? () => setArrivalModal(true) : null}
        />
        <div className="overflowHide">
          <div className="overflowHide2"></div>
        </div>
      </div>
      {departureModal && (
        <div className="departureModal">
          <div className="departureModalTop">
            <div className="departureModalTopContent">
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
                value={departureCity}
                onChange={handleInputChange}
                id="departureInput"
              />
            </div>
          </div>
          <div className="departureModalResult">
            {autoCompleteResultsDeparture.length > 0 && (
              <ul>
                {autoCompleteResultsDeparture.map((result) => (
                  <li
                    key={result.local_name}
                    onClick={() => handleSelectResult(result)}
                  >
                    {result.local_name}
                  </li>
                ))}
              </ul>
            )}
            {popularCities.length > 0 && isDepartureFocused && (
              <div className="Popular">
                <h2>Villes populaires</h2>
                <ul>
                  {popularCities.map((city) => (
                    <li key={city.local_name}>{city.local_name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      {arrivalModal && (
        <div className="arrivalModal">
          <div className="arrivalModalTop">
            <div className="arrivalModalTopContent">
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
                id="arrivalInput"
              />
            </div>
          </div>
          <div className="arrivalModalResult">
            {autoCompleteResultsArrival.length > 0 && (
              <ul>
                {autoCompleteResultsArrival.map((result) => (
                  <li
                    key={result.local_name}
                    onClick={() => handleSelectResultArrival(result)}
                  >
                    {result.local_name}
                  </li>
                ))}
              </ul>
            )}
            {popularCitiesFromDeparture.length > 0 && isArrivalFocused && (
              <div className="popularFromDeparture">
                <span>Villes populaires au départ de {departureCity}</span>
                <ul>
                  {popularCitiesFromDeparture.map((result) => (
                    <li
                      key={result.local_name}
                      onClick={() => handleSelectResultArrival(result)}
                    >
                      {result.local_name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Departure;
