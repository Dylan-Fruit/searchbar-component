import React, { useEffect, useState } from "react";
import "./Calendar.scss";

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow);
  }, []);

  const options = {
    month: "short",
    day: "numeric",
    weekday: "short",
  };
  const dateFormatter = new Intl.DateTimeFormat("fr-FR", options);

  return (
    <div className="Calendar">
      <div className="departureDate">
        <div className="departureDateContent">
          <div className="calendarSVG">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2V4a1 1 0 1 1 2 0v1h8V4a1 1 0 0 1 2 0v1zM5 10a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1H5z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <span>{dateFormatter.format(date)}</span>
        </div>
      </div>
      <div className="arrivalDate">
        <div className="arrivalDateContent">
          <span>Ajouter retour</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
