import React from "react";
import { Home, HomeOutline } from "react-ionicons";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  React.useEffect(() => {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll(".circle");
    const colors = [
      "#f8e6d3",
      "#ffddbd",
      "#ffcc99",
      "#ffc285",
      "#ef865e",
      "#ec805d",
      "#e36e5c",
      "#ffb56b",
      "#d5585c",
      "#d1525c",
      "#ff962e",
      "#c03b5d",
      "#fa9c3d",
      "#ac265e",
      "#9c155f",
      "#950f5f",
      "#ff9124",
      "#7c0060",
      "#680060",
      "#60005f",
      "#48005f",
      "#ff8000",
    ];

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
  const navigateTo = useNavigate();
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
      <div
        className="notFound"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <img src="404.svg" />
        <Button
          id="buttonNew"
          style={{
            backgroundColor: "#D69B24",
            color: "#121212",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "10px",
            marginLeft: "3rem ",
            padding: "0.5rem 1rem",
            marginBottom: ".5rem",
          }}
          startIcon={
            <Home
              color={"#121212"}
              height="25px"
              width="25px"
              style={{
                marginRight: "10px",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            />
          }
          onClick={() => navigateTo("/")}
          variant="contained"
          className="buttonNew"
        >
          Home
        </Button>
      </div>
    </>
  );
}
