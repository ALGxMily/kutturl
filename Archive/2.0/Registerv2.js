import React from "react";
import "./Loginv2.css";
import { Home, HomeOutline } from "react-ionicons";

export default function Registerv2() {
  return (
    <>
      <div
        className="home-button"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <Home
          cssClasses={"home-button-icon"}
          color={"#e8a722"}
          title={"Home"}
          height="40px"
          width="40px"
        />
      </div>
      <div className="login-wrapper">
        <img src="logo-center-old.svg" alt="logo" className="logo" />
        <input type="text" placeholder="Username" id="first-input" />
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Sign up</button>
      </div>
    </>
  );
}
