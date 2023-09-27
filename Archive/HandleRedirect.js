import React from "react";
import "./App.css";
import { colors } from "../src/App";
import {
  useNavigate,
  useParams,
  createSearchParams,
  redirect,
} from "react-router-dom";
import Lottie from "lottie-react";
import Snowfall from "react-snowfall";
export default function HandleRedirect() {
  const { shortId } = useParams();

  const [url, setUrl] = React.useState(null);
  const [ip, setIp] = React.useState(null);

  const isDev = process.env.NODE_ENV === "development";
  const public_url = isDev
    ? "http://localhost:3000"
    : "https://kuturl.herokuapp.com";

  React.useEffect(() => {
    fetch(`${public_url}/?i=${shortId}`, {
      method: "GET",
    })
      .then((res) => {
        res.json().then((data) => {
          setUrl(data.url);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [shortId]);

  if (url) {
    window.location.href = url;
    fetch("https://api.ipify.org/?format=json")
      .then((response) => response.json())
      .then((data) => setIp(data.ip));
    fetch(`${public_url}/api/redirects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ip: ip,
        shortId: shortId,
        url: url,
      }),
    });
  }
  React.useEffect(() => {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll(".circle");

    circles.forEach(function (circle, index) {
      circle.x = 0;
      circle.y = 0;
      circle.style.backgroundColor = colors[index % colors.length];
    });

    window.addEventListener("mousemove", function (e) {
      coords.x = e.clientX;
      coords.y = e.clientY;
    });

    function animateCircles() {
      let x = coords.x;
      let y = coords.y;

      circles.forEach(function (circle, index) {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";

        circle.style.scale = (circles.length - index) / circles.length;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
      });

      requestAnimationFrame(animateCircles);
    }

    animateCircles();
  }, []);
  const [snow, setSnow] = React.useState(false);
  return (
    <>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      {snow && (
        <Snowfall
          // The color of the snowflake, can be any valid CSS color.
          color="#fff"
          // Applied to the canvas element.
          style={{ background: "transparent" }}
          // Controls the number of snowflakes that are created (defaults to 150).
          snowflakeCount={400}
          // Controls the maximum size of the snowflakes (defaults to 5).
          maxSnowflakeSize={5}
          // Controls the minimum size of the snowflakes (defaults to 1).
          minSnowflakeSize={1}
        />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Lottie
          animationData={require("../src/loading.json")}
          style={{ width: "100px", height: "100px" }}
        />
        <h1
          style={{
            color: "white",
            fontSize: "2rem",
            marginLeft: "1rem",
          }}
        >
          Almost there!
        </h1>
      </div>
    </>
  );
}
