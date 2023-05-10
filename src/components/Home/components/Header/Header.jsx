import React from "react";
import logo from "../../../../assets/logo.svg";

const Header = () => {
  return (
    <div className="header">
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
    </div>
  );
};

export default Header;
