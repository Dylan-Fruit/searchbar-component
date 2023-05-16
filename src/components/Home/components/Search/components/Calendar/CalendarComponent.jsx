import React, { useEffect, useState } from "react";
import isMobile from "is-mobile";
import MonthView, { Calendar } from "react-calendar";
import "./CalendarComponent.scss";

const CalendarComponent = ({ returnDate, setReturnDate }) => {
  const [date, setDate] = useState(new Date());
  const [arrivalDate, setArrivalDate] = useState(null);
  const [showDepartureCalendar, setShowDepartureCalendar] = useState(false);
  const [showReturnCalendar, setShowReturnCalendar] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isCurrentMonth, setIsCurrentMonth] = useState(true);

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

  useEffect(() => {
    if (isMobile) {
      setIsMobileDevice(isMobile());
    }
  }, []);

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
    if (selectedDate >= date) {
      setArrivalDate(selectedDate);
      setReturnDate(selectedDate);
      setShowReturnCalendar(false);
    }
  }

  function handleCloseMenu() {
    setShowDepartureCalendar(false);
    setShowReturnCalendar(false);
  }
  function handlePrevMonthClick() {
    const prevMonth = getPrevMonth(currentMonth);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    prevMonth.setHours(0, 0, 0, 0);

    if (prevMonth >= now) {
      setCurrentMonth(prevMonth);
      setIsCurrentMonth(
        prevMonth.getMonth() === now.getMonth() &&
          prevMonth.getFullYear() === now.getFullYear()
      );
    }
  }
  function handleNextMonthClick() {
    setCurrentMonth(getNextMonth(currentMonth));
    setIsCurrentMonth(false);
  }

  function getNextMonth(date) {
    const nextMonth = new Date(date.getTime());
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    console.log("Next month: ", nextMonth);
    return nextMonth;
  }

  function getPrevMonth(date) {
    const prevMonth = new Date(date.getTime());
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    console.log("Previous month: ", prevMonth);
    return prevMonth;
  }

  const year = new Date().getFullYear();
  const months = [];
  for (
    let monthIndex = new Date().getMonth();
    monthIndex < 16;
    monthIndex += 1
  ) {
    months.push(
      <MonthView
        onChange={handleDepartureDateSelect}
        value={date}
        onClickDay={handleDepartureDateSelect}
        minDate={new Date()}
        activeStartDate={new Date(year, monthIndex)}
        defaultView="month"
      />
    );
  }
  const arrivalMonth = [];
  for (
    let arrivalIndex = new Date().getMonth();
    arrivalIndex < new Date().getMonth() + 16;
    arrivalIndex += 1
  ) {
    arrivalMonth.push(
      <MonthView
        onChange={handleReturnDateSelect}
        value={arrivalDate}
        onClickDay={handleReturnDateSelect}
        minDate={date}
        activeStartDate={new Date(year, arrivalIndex)}
        defaultView="month"
      />
    );
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
          {isMobileDevice ? (
            <div className="calendarModalDays">{months}</div>
          ) : (
            <div className="calendarModalDays">
              <div
                className={isCurrentMonth ? "hidden" : "calendarModalDaysSVG"}
                onClick={handlePrevMonthClick}
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
              <Calendar
                onChange={handleDepartureDateSelect}
                value={date}
                minDate={new Date()}
                onClickDay={handleDepartureDateSelect}
                activeStartDate={currentMonth}
                showNeighboringMonth={false}
              />
              <Calendar
                onChange={handleDepartureDateSelect}
                value={date}
                minDate={new Date()}
                onClickDay={handleDepartureDateSelect}
                activeStartDate={getNextMonth(currentMonth)}
                showNeighboringMonth={false}
              />
              <div
                className={"calendarModalDaysSVG2"}
                onClick={handleNextMonthClick}
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
            </div>
          )}
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
          {isMobileDevice ? (
            <div className="calendarModalDays">{arrivalMonth}</div>
          ) : (
            <div className="calendarModalDays">
              <div
                className={
                  isCurrentMonth && currentMonth <= date
                    ? "hidden"
                    : "calendarModalDaysSVG"
                }
                onClick={handlePrevMonthClick}
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
              <Calendar
                onChange={handleReturnDateSelect}
                value={arrivalDate}
                onClickDay={handleReturnDateSelect}
                minDate={date}
                activeStartDate={currentMonth}
                showNeighboringMonth={false}
              />
              <Calendar
                onChange={handleReturnDateSelect}
                value={arrivalDate}
                onClickDay={handleReturnDateSelect}
                minDate={date}
                activeStartDate={getNextMonth(currentMonth)}
                showNeighboringMonth={false}
              />
              <div
                className={"calendarModalDaysSVG2"}
                onClick={handleNextMonthClick}
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
