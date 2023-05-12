import React, { useState } from "react";
import "./RoundTrip.scss";

const RoundTrip = () => {
  const [tripType, setTripType] = useState("Aller simple");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleTripTypeChange = (event) => {
    setTripType(event.target.innerText);
    setDropdownOpen(false);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="RoundTrip">
      <button
        type="button"
        aria-haspopup="true"
        className="dropdown-button"
        onClick={handleDropdownToggle}
      >
        <p>
          <span>{tripType}</span>
        </p>
        <div className={dropdownOpen ? "chevron-up" : "chevron-down"}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 14.121l6.364-6.364a1 1 0 0 1 1.414 1.415l-7.07 7.07a.997.997 0 0 1-1.415 0l-7.071-7.07a1 1 0 1 1 1.414-1.415L12 14.121z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </button>
      {dropdownOpen && (
        <div className="dropdown-menu">
          <ul>
            <li onClick={handleTripTypeChange}>
              <svg
                className={
                  tripType === "Aller simple" ? "display-on" : "display-off"
                }
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                size="18"
                color="#5E90CC"
              >
                <path
                  fill="currentColor"
                  d="M21.602 4.3l.015.015c.403.403.41 1.054.016 1.465L9.053 18.91a1.047 1.047 0 0 1-1.512 0l-5.25-5.472a1.047 1.047 0 0 1 .016-1.465l.015-.015a1.02 1.02 0 0 1 1.46.019l4.136 4.36a.524.524 0 0 0 .76.001l11.46-12.021a1.022 1.022 0 0 1 1.464-.018z"
                ></path>
              </svg>
              Aller simple
            </li>
            <li onClick={handleTripTypeChange}>
              <svg
                className={
                  tripType === "Aller-retour" ? "display-on" : "display-off"
                }
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                size="18"
                color="#5E90CC"
              >
                <path
                  fill="currentColor"
                  d="M21.602 4.3l.015.015c.403.403.41 1.054.016 1.465L9.053 18.91a1.047 1.047 0 0 1-1.512 0l-5.25-5.472a1.047 1.047 0 0 1 .016-1.465l.015-.015a1.02 1.02 0 0 1 1.46.019l4.136 4.36a.524.524 0 0 0 .76.001l11.46-12.021a1.022 1.022 0 0 1 1.464-.018z"
                ></path>
              </svg>
              Aller-retour
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default RoundTrip;
