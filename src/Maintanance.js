import React from "react";
import Lottie from "lottie-react";
import maintanance from "./lottie/loading_maint.json";
import "./Maintanance.css";

export default function Maintanance() {
  return (
    <div className="wrapper">
      <div className="header">
        <img src="logo-center-old.svg" />
      </div>
      <div className="content">
        <Lottie
          animationData={maintanance}
          style={{ width: "20%", height: "20%", margin: "auto" }}
        />
        <h1>Sorry, we are currently under maintanance</h1>
      </div>
      <div className="footer">
        <p>
          Made with{" "}
          <span
            className="heart"
            style={{ color: "#fbbd12", fontSize: "20px" }}
          >
            ❤
          </span>{" "}
          by Dzhuliano Dimov
        </p>
      </div>
    </div>
  );
}
