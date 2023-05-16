import React, { useState, useEffect } from "react";
import isMobile from "is-mobile";
import bats from "../../../../../../assets/bats.png";
import "./Passengers.scss";
import Toggle from "react-toggle";

const Passengers = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [passengerCounts, setPassengerCounts] = useState({
    adults: 1,
    youths: 0,
    seniors: 0,
    discounts: 0,
  });
  const [isDiscountToggleChecked, setDiscountToggleChecked] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  function updatePassengerCount(type, increment) {
    setPassengerCounts((passengerCounts) => {
      const newCount = passengerCounts[type] + increment;
      if (newCount < 0 || totalPassengers + increment > 9) {
        return passengerCounts;
      }
      return { ...passengerCounts, [type]: newCount };
    });
  }

  const totalPassengers = Object.values(passengerCounts).reduce(
    (a, b) => a + b,
    0
  );

  const isAdultButtonDisabled = passengerCounts.adults === 0;
  const isYouthButtonDisabled = passengerCounts.youths === 0;
  const isSeniorButtonDisabled = passengerCounts.seniors === 0;
  const isButtonPlusDisabled = totalPassengers === 9;

  function handleOpenMenu() {
    setIsMenuOpen(true);
  }

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  return (
    <div className="Passengers">
      <div
        className="passengerButton"
        onClick={isMenuOpen ? handleCloseMenu : handleOpenMenu}
      >
        <div className={isMobileDevice ? "passengerSVG" : "hidden"}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="12"
              cy="7"
              r="4"
              fill="currentColor"
              fillRule="evenodd"
            ></circle>
            <path
              d="M20.963 20.402c.04.329-.23.598-.56.598H3.597c-.332 0-.6-.27-.561-.598C3.396 17.38 6.384 13 12 13s8.604 4.38 8.963 7.402z"
              fill="currentColor"
              fillRule="evenodd"
            ></path>
          </svg>
        </div>
        {isMobileDevice ? (
          <div className="numberOfPassengers">
            <p>{totalPassengers}</p>
          </div>
        ) : (
          <div className="numberOfPassengers">
            <p>{totalPassengers}</p>
            {totalPassengers === passengerCounts.adults ? (
              <div className="numberOfPassengersText">
                <p>{totalPassengers > 1 ? "Adultes," : "Adulte,"}</p>
              </div>
            ) : (
              <div className="numberOfPassengersText">
                <p>{totalPassengers > 1 ? "Passagers," : ""}</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div
        className="discountButton"
        onClick={isMenuOpen ? handleCloseMenu : handleOpenMenu}
      >
        <div className={isMobileDevice ? "discountSVG" : "hidden"}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.375 15.375c2.025 0 3.825-.9 5.063-2.25H21v6.75C21 20.55 20.55 21 19.875 21H4.125C3.45 21 3 20.55 3 19.875v-6.75h7.313c1.237 1.35 3.037 2.25 5.062 2.25zm-6.75-6.75c0 .787.113 1.575.338 2.25H3v-2.25C3 7.95 3.45 7.5 4.125 7.5h4.613c-.113.338-.113.787-.113 1.125zm6.75 5.625c-3.037 0-5.625-2.475-5.625-5.625S12.225 3 15.375 3 21 5.475 21 8.625s-2.475 5.625-5.625 5.625zm1.913-8.662l-4.726 5.174.788.788 4.725-5.175-.787-.787zm.337 6.3a1.013 1.013 0 1 0 0-2.026 1.013 1.013 0 0 0 0 2.025zm-4.5-4.5a1.013 1.013 0 1 0 0-2.026 1.013 1.013 0 0 0 0 2.026z"
              fill="currentColor"
              fillRule="evenodd"
            ></path>
          </svg>
        </div>
        {isMobileDevice ? (
          <div className="numberOfDiscount">
            <p>{passengerCounts.discounts}</p>
          </div>
        ) : (
          <div className="numberOfDiscount">
            <p>Sans carte de réduction</p>
          </div>
        )}
      </div>
      <div
        id="hiddenSVG"
        className={isMenuOpen ? "chevron-up" : "chevron-down"}
        onClick={isMenuOpen ? handleCloseMenu : handleOpenMenu}
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 14.121l6.364-6.364a1 1 0 0 1 1.414 1.415l-7.07 7.07a.997.997 0 0 1-1.415 0l-7.071-7.07a1 1 0 1 1 1.414-1.415L12 14.121z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      {isMenuOpen && (
        <div className="passengersMenu">
          <div className="passengersTop">
            <div className="passengersTopText">
              <p>Passagers</p>
            </div>
            <div className="passengersTopSVG" onClick={() => handleCloseMenu()}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.192 11.778l5.657 5.657a1 1 0 0 1-1.414 1.414l-5.657-5.657-5.657 5.657a1 1 0 1 1-1.414-1.414l5.657-5.657-5.657-5.657a1 1 0 0 1 1.414-1.414l5.657 5.657 5.657-5.657a1 1 0 0 1 1.414 1.414l-5.657 5.657z"
                  id="Close__a"
                ></path>
                <use fill="currentColor"></use>
              </svg>
            </div>
          </div>
          <div className="passengersAge">
            <div className="passengersAdult">
              <div className="passengersAdultContent">
                <div className="passengersAdultContentText">
                  <span className="type">Adulte</span>
                  <span className="years">26+ années</span>
                </div>
                <div className="passengersCount">
                  <div className="passengersCountSVG">
                    <button
                      className={
                        isAdultButtonDisabled ? "btnDisabled" : "minusSVG"
                      }
                      onClick={() => updatePassengerCount("adults", -1)}
                      disabled={isAdultButtonDisabled}
                    >
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="currentColor">
                          <path d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16zm0-2C8.268 30 2 23.732 2 16S8.268 2 16 2s14 6.268 14 14-6.268 14-14 14z"></path>
                          <path d="M9 15h14a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2z"></path>
                        </g>
                      </svg>
                    </button>
                  </div>
                  <div className="passengersCountText">
                    <span>{passengerCounts.adults}</span>
                  </div>
                  <div className="passengersCountSVG">
                    <button
                      className={
                        isButtonPlusDisabled ? "btnDisabled" : "plusSVG"
                      }
                      disabled={isButtonPlusDisabled}
                      onClick={() => updatePassengerCount("adults", 1)}
                    >
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="currentColor">
                          <path d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16zm0-2C8.268 30 2 23.732 2 16S8.268 2 16 2s14 6.268 14 14-6.268 14-14 14z"></path>
                          <path d="M16 8a1 1 0 0 1 1 1v6h6a1 1 0 0 1 0 2h-6.001L17 23a1 1 0 0 1-2 0l-.001-6H9a1 1 0 0 1 0-2h6V9a1 1 0 0 1 1-1z"></path>
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="passengersYouths">
              <div className="passengersYouthsContent">
                <div className="passengersYouthsContentText">
                  <span className="type">Jeune</span>
                  <span className="years">0-25 années</span>
                </div>
                <div className="passengersCount">
                  <div className="passengersCountSVG">
                    <button
                      className={
                        isYouthButtonDisabled ? "btnDisabled" : "minusSVG"
                      }
                      onClick={() => updatePassengerCount("youths", -1)}
                      disabled={isYouthButtonDisabled}
                    >
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="currentColor">
                          <path d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16zm0-2C8.268 30 2 23.732 2 16S8.268 2 16 2s14 6.268 14 14-6.268 14-14 14z"></path>
                          <path d="M9 15h14a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2z"></path>
                        </g>
                      </svg>
                    </button>
                  </div>
                  <div className="passengersCountText">
                    <span>{passengerCounts.youths}</span>
                  </div>
                  <div className="passengersCountSVG">
                    <button
                      className={
                        isButtonPlusDisabled ? "btnDisabled" : "plusSVG"
                      }
                      disabled={isButtonPlusDisabled}
                      onClick={() => updatePassengerCount("youths", 1)}
                    >
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="currentColor">
                          <path d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16zm0-2C8.268 30 2 23.732 2 16S8.268 2 16 2s14 6.268 14 14-6.268 14-14 14z"></path>
                          <path d="M16 8a1 1 0 0 1 1 1v6h6a1 1 0 0 1 0 2h-6.001L17 23a1 1 0 0 1-2 0l-.001-6H9a1 1 0 0 1 0-2h6V9a1 1 0 0 1 1-1z"></path>
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div
                className={
                  passengerCounts.youths === 0 ? "disabled" : "displayed"
                }
              >
                {Array.from(Array(passengerCounts.youths), (_, index) => (
                  <div className="elementDisplayed" key={index}>
                    <span>Jeune {index + 1}</span>
                    <div className="select">
                      <div className="selectSVG">
                        <svg
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 14.121l6.364-6.364a1 1 0 0 1 1.414 1.415l-7.07 7.07a.997.997 0 0 1-1.415 0l-7.071-7.07a1 1 0 1 1 1.414-1.415L12 14.121z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <select name="selectAge" id="selectAge">
                        <option value="">Âge</option>
                        <option value="0" label="0 an">
                          0 an
                        </option>
                        <option value="1" label="1 an">
                          1 an
                        </option>
                        <option value="2" label="2 ans">
                          2 ans
                        </option>
                        <option value="3" label="3 ans">
                          3 ans
                        </option>
                        <option value="4" label="4 ans">
                          4 ans
                        </option>
                        <option value="5" label="5 ans">
                          5 ans
                        </option>
                        <option value="6" label="6 ans">
                          6 ans
                        </option>
                        <option value="7" label="7 ans">
                          7 ans
                        </option>
                        <option value="8" label="8 ans">
                          8 ans
                        </option>
                        <option value="9" label="9 ans">
                          9 ans
                        </option>
                        <option value="10" label="10 ans">
                          10 ans
                        </option>
                        <option value="11" label="11 ans">
                          11 ans
                        </option>
                        <option value="12" label="12 ans">
                          12 ans
                        </option>
                        <option value="13" label="13 ans">
                          13 ans
                        </option>
                        <option value="14" label="14 ans">
                          14 ans
                        </option>
                        <option value="15" label="15 ans">
                          15 ans
                        </option>
                        <option value="16" label="16 ans">
                          16 ans
                        </option>
                        <option value="17" label="17 ans">
                          17 ans
                        </option>
                        <option value="18" label="18 ans">
                          18 ans
                        </option>
                        <option value="19" label="19 ans">
                          19 ans
                        </option>
                        <option value="20" label="20 ans">
                          20 ans
                        </option>
                        <option value="21" label="21 ans">
                          21 ans
                        </option>
                        <option value="22" label="22 ans">
                          22 ans
                        </option>
                        <option value="23" label="23 ans">
                          23 ans
                        </option>
                        <option value="24" label="24 ans">
                          24 ans
                        </option>
                        <option value="25" label="25 ans">
                          25 ans
                        </option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="passengersSenior">
              <div className="passengersSeniorContent">
                <div className="passengersSeniorContentText">
                  <span className="type">Senior</span>
                  <span className="years">58+ années</span>
                </div>
                <div className="passengersCount">
                  <div className="passengersCountSVG">
                    <button
                      className={
                        isSeniorButtonDisabled ? "btnDisabled" : "minusSVG"
                      }
                      onClick={() => updatePassengerCount("seniors", -1)}
                      disabled={isSeniorButtonDisabled}
                    >
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="currentColor">
                          <path d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16zm0-2C8.268 30 2 23.732 2 16S8.268 2 16 2s14 6.268 14 14-6.268 14-14 14z"></path>
                          <path d="M9 15h14a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2z"></path>
                        </g>
                      </svg>
                    </button>
                  </div>
                  <div className="passengersCountText">
                    <span>{passengerCounts.seniors}</span>
                  </div>
                  <div className="passengersCountSVG">
                    <button
                      className={
                        isButtonPlusDisabled ? "btnDisabled" : "plusSVG"
                      }
                      disabled={isButtonPlusDisabled}
                      onClick={() => updatePassengerCount("seniors", 1)}
                    >
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="currentColor">
                          <path d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16zm0-2C8.268 30 2 23.732 2 16S8.268 2 16 2s14 6.268 14 14-6.268 14-14 14z"></path>
                          <path d="M16 8a1 1 0 0 1 1 1v6h6a1 1 0 0 1 0 2h-6.001L17 23a1 1 0 0 1-2 0l-.001-6H9a1 1 0 0 1 0-2h6V9a1 1 0 0 1 1-1z"></path>
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div
                className={
                  passengerCounts.seniors === 0 ? "disabled" : "displayed"
                }
              >
                {Array.from(Array(passengerCounts.seniors), (_, index) => (
                  <div className="elementDisplayed" key={index}>
                    <span>Senior {index + 1}</span>
                    <div className="select">
                      <div className="selectSVG">
                        <svg
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 14.121l6.364-6.364a1 1 0 0 1 1.414 1.415l-7.07 7.07a.997.997 0 0 1-1.415 0l-7.071-7.07a1 1 0 1 1 1.414-1.415L12 14.121z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <select name="selectAge" id="selectAge">
                        <option value="">Âge</option>
                        <option value="58" label="58 ans">
                          58 ans
                        </option>
                        <option value="59" label="59 ans">
                          59 ans
                        </option>
                        <option value="60" label="60 ans">
                          60 ans
                        </option>
                        <option value="61" label="61 ans">
                          61 ans
                        </option>
                        <option value="62" label="62 ans">
                          62 ans
                        </option>
                        <option value="63" label="63 ans">
                          63 ans
                        </option>
                        <option value="64" label="64 ans">
                          64 ans
                        </option>
                        <option value="65" label="65 ans">
                          65 ans
                        </option>
                        <option value="66" label="66 ans">
                          66 ans
                        </option>
                        <option value="67" label="67 ans">
                          67 ans
                        </option>
                        <option value="68" label="68 ans">
                          68 ans
                        </option>
                        <option value="69" label="69 ans">
                          69 ans
                        </option>
                        <option value="70" label="70 ans">
                          70 ans
                        </option>
                        <option value="71" label="71 ans">
                          71 ans
                        </option>
                        <option value="72" label="72 ans">
                          72 ans
                        </option>
                        <option value="73" label="73 ans">
                          73 ans
                        </option>
                        <option value="74" label="74 ans">
                          74 ans
                        </option>
                        <option value="75" label="75 ans">
                          75 ans
                        </option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="passengersDiscount">
            <div className="passengersDiscountText">
              <div className="discountSVG">
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  size="24"
                  color="#425486"
                >
                  <path
                    d="M15.375 15.375c2.025 0 3.825-.9 5.063-2.25H21v6.75C21 20.55 20.55 21 19.875 21H4.125C3.45 21 3 20.55 3 19.875v-6.75h7.313c1.237 1.35 3.037 2.25 5.062 2.25zm-6.75-6.75c0 .787.113 1.575.338 2.25H3v-2.25C3 7.95 3.45 7.5 4.125 7.5h4.613c-.113.338-.113.787-.113 1.125zm6.75 5.625c-3.037 0-5.625-2.475-5.625-5.625S12.225 3 15.375 3 21 5.475 21 8.625s-2.475 5.625-5.625 5.625zm1.913-8.662l-4.726 5.174.788.788 4.725-5.175-.787-.787zm.337 6.3a1.013 1.013 0 1 0 0-2.026 1.013 1.013 0 0 0 0 2.025zm-4.5-4.5a1.013 1.013 0 1 0 0-2.026 1.013 1.013 0 0 0 0 2.026z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <span>Ajouter carte de réduction</span>
              <div className="infoSVG">
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  size="20"
                  color="#425486"
                >
                  <path
                    d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 14a1 1 0 0 1-1-1v-7a1 1 0 1 1 2 0v7a1 1 0 0 1-1 1zm0-12a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="passengersDiscountToggle">
              <Toggle
                defaultChecked={false}
                icons={false}
                onChange={(e) => setDiscountToggleChecked(e.target.checked)}
              />
            </div>
          </div>
          <div className={isDiscountToggleChecked ? "hidden" : "alertMessage"}>
            <div className="alertMessageContent">
              <div className="alertSVG">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle id="Exclamation__a" cx="12" cy="12" r="10"></circle>
                  <path
                    d="M12 6a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V7a1 1 0 0 1 1-1zm0 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                    id="Exclamation__b"
                  ></path>
                </svg>
              </div>
              <div className="alertText">
                <span>
                  Veuillez sélectionner votre trajet avant d'ajouter des cartes
                  de réduction.
                </span>
              </div>
            </div>
            <div className="alertImg">
              <img src={bats} alt="batbat img" />
            </div>
          </div>
          <div className="passengersBtn">
            <button onClick={handleCloseMenu}>Confirmer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Passengers;
