import { fontSize } from "@mui/system";
import React from "react";
import "./tips.css";
import tips from "./tips.json";

export default function KutturlTips({ controlShow }) {
  const [show, setShow] = React.useState(controlShow);
  const [message, setMessage] = React.useState("");

  //read from dir and find tips.json and read it
  //set message to the message in the json file
  async function getRandTip() {
    const randomNum = Math.round(Math.random() * 100) % tips.tips.length;
    console.log(tips.tips[randomNum]);
    setMessage(tips.tips[randomNum]);
  }
  React.useEffect(() => {
    getRandTip();
  }, []);

  //if device is mobile then setShow to false
  React.useEffect(() => {
    if (window.innerWidth < 768) {
      setShow(false);
    }
  }, []);
  React.useEffect(() => {
    console.log("show", show);
    console.log("controlShow", controlShow);
    setShow(controlShow);

    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [controlShow]);
  return (
    <>
      {show ? (
        <div className="outerWrapper">
          <div className="innerWrapper">
            <div className="header">
              {/* <h1> </h1> */}
              <h1>Kutturl Tips</h1>
              {/* <button className="closeButton">X</button> */}
            </div>
            <div className="body">
              <h1>{message}</h1>
            </div>
            <div className="loading-bar">
              <div className="loading-bar-inner"></div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
