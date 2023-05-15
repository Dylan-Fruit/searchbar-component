import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./CalendarComponent.scss";

const CalendarComponent = ({ returnDate, setReturnDate }) => {
  const [date, setDate] = useState(new Date());
  const [arrivalDate, setArrivalDate] = useState(null);
  const [showDepartureCalendar, setShowDepartureCalendar] = useState(false);
  const [showReturnCalendar, setShowReturnCalendar] = useState(false);

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow);
  }, []);

  useEffect(() => {
    if (arrivalDate) {
      setReturnDate(arrivalDate);
    }
  }, [arrivalDate, setReturnDate]);

  const options = {
    month: "short",
    day: "numeric",
    weekday: "short",
  };
  const dateFormatter = new Intl.DateTimeFormat("fr-FR", options);
  const returnDateFormatter = returnDate
    ? dateFormatter.format(returnDate)
    : "Ajouter retour";

  function handleDepartureDateClick() {
    setShowDepartureCalendar(!showDepartureCalendar);
    setShowReturnCalendar(false);
  }

  function handleReturnDateClick() {
    setShowReturnCalendar(!showReturnCalendar);
    setShowDepartureCalendar(false);
  }

  function handleDepartureDateSelect(selectedDate) {
    setDate(selectedDate);
    setShowDepartureCalendar(false);
  }

  function handleReturnDateSelect(selectedDate) {
    setArrivalDate(selectedDate);
    setReturnDate(selectedDate);
    setShowReturnCalendar(false);
  }

  function handleCloseMenu() {
    setShowDepartureCalendar(false);
    setShowReturnCalendar(false);
  }

  return (
    <div className="Calendar">
      <div className="departureDate" onClick={handleDepartureDateClick}>
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
      <div className="arrivalDate" onClick={handleReturnDateClick}>
        <div className="arrivalDateContent">
          <span className={returnDate ? "returnDate" : "addReturn"}>
            {returnDateFormatter}
          </span>
        </div>
      </div>
      {showDepartureCalendar && (
        <div className="calendarModal">
          <div className="calendarModalTop">
            <div className="calendarModalTopContent">
              <div
                className="calendarModalTopContentSVG"
                onClick={() => handleCloseMenu()}
              >
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
              <div className="calendarModalTopContentText">
                <p>Date de départ</p>
              </div>
            </div>
            <div className="calendarModalTopWeekdays">
              <ul>
                <li>Lun</li>
                <li>Mar</li>
                <li>Mer</li>
                <li>Jeu</li>
                <li>Ven</li>
                <li className="weekend">Sam</li>
                <li className="weekend">Dim</li>
              </ul>
            </div>
          </div>
          <div className="calendarModalDays">
            <Calendar
              onChange={handleDepartureDateSelect}
              value={date}
              onClickDay={handleDepartureDateSelect}
              minDate={new Date()}
            />
          </div>
        </div>
      )}
      {showReturnCalendar && (
        <div className="calendarModal">
          <div className="calendarModalTop">
            <div className="calendarModalTopContent">
              <div
                className="calendarModalTopContentSVG"
                onClick={() => handleCloseMenu()}
              >
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
              <div className="calendarModalTopContentText">
                <p>Date de retour</p>
              </div>
            </div>
          </div>
          <div className="calendarModalDays">
            <Calendar
              onChange={handleReturnDateSelect}
              value={arrivalDate}
              onClickDay={handleReturnDateSelect}
              minDate={date}
              selectRange={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
