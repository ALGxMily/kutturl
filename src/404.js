import React from "react";
import { Home, HomeOutline } from "react-ionicons";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigateTo = useNavigate();
  return (
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
  );
}
