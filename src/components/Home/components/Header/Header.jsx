import React, { useState, useEffect } from "react";
import logo from "../../../../assets/logo.svg";
import flagFR from "../../../../assets/flag-fr.svg";
import isMobile from "is-mobile";
import "./Header.scss";

const Header = () => {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setIsMobileDevice(isMobile());
    }
  }, []);

  return (
    <div className="header">
      {isMobileDevice ? (
        <nav>
          <img src={logo} alt="logo omio" />
          <button className="burger">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="currentColor"
                d="M3 5h18a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm0 6h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm0 6h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2z"
              ></path>
            </svg>
          </button>
        </nav>
      ) : (
        <div className="nav">
          <div className="leftSide">
            <div className="leftSideImg">
              <img src={logo} alt="logo omio" />
            </div>
            <ul>
              <li>Train</li>
              <li>Bus</li>
              <li>Vols</li>
              <li>Ferries</li>
            </ul>
          </div>
          <div className="rightSide">
            <div className="currency">
              <span>€</span>
              <div className="currencySVG">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 14.121l6.364-6.364a1 1 0 0 1 1.414 1.415l-7.07 7.07a.997.997 0 0 1-1.415 0l-7.071-7.07a1 1 0 1 1 1.414-1.415L12 14.121z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="language">
              <div className="languageIMG">
                <img src={flagFR} alt="french flag" />
              </div>
              <div className="languageSVG">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 14.121l6.364-6.364a1 1 0 0 1 1.414 1.415l-7.07 7.07a.997.997 0 0 1-1.415 0l-7.071-7.07a1 1 0 1 1 1.414-1.415L12 14.121z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="accountGestion">
              <ul>
                <li>Vos réservations</li>
                <li>Connexion</li>
                <li>Créer un compte</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
