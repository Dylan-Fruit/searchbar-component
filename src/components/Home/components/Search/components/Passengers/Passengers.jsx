import React from "react";
import "./Passengers.scss";

const Passengers = () => {
  const numberOfPassengers = "1";
  const numberOfReductions = "0";

  return (
    <div className="Passengers">
      <div className="passengerButton">
        <div className="passengerSVG">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="12"
              cy="7"
              r="4"
              fill="currentColor"
              fill-rule="evenodd"
            ></circle>
            <path
              d="M20.963 20.402c.04.329-.23.598-.56.598H3.597c-.332 0-.6-.27-.561-.598C3.396 17.38 6.384 13 12 13s8.604 4.38 8.963 7.402z"
              fill="currentColor"
              fill-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div className="numberOfPassengers">
          <p>{numberOfPassengers}</p>
        </div>
      </div>
      <div className="reductionButton">
        <div className="reductionSVG">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.375 15.375c2.025 0 3.825-.9 5.063-2.25H21v6.75C21 20.55 20.55 21 19.875 21H4.125C3.45 21 3 20.55 3 19.875v-6.75h7.313c1.237 1.35 3.037 2.25 5.062 2.25zm-6.75-6.75c0 .787.113 1.575.338 2.25H3v-2.25C3 7.95 3.45 7.5 4.125 7.5h4.613c-.113.338-.113.787-.113 1.125zm6.75 5.625c-3.037 0-5.625-2.475-5.625-5.625S12.225 3 15.375 3 21 5.475 21 8.625s-2.475 5.625-5.625 5.625zm1.913-8.662l-4.726 5.174.788.788 4.725-5.175-.787-.787zm.337 6.3a1.013 1.013 0 1 0 0-2.026 1.013 1.013 0 0 0 0 2.025zm-4.5-4.5a1.013 1.013 0 1 0 0-2.026 1.013 1.013 0 0 0 0 2.026z"
              fill="currentColor"
              fill-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div className="numberOfReduction">
          <p>{numberOfReductions}</p>
        </div>
      </div>
    </div>
  );
};

export default Passengers;
