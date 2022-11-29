import React from "react";
import { useNavigate, useParams, createSearchParams } from "react-router-dom";
import Lottie from "lottie-react";
import GoogleAd from "./GoogleAd";
import {Adsense} from "@ctrl/react-adsense";

export default function HandleRedirect() {
  const { shortId } = useParams();

  const [url, setUrl] = React.useState(null);
  const [ip, setIp] = React.useState(null);

  const isDev = process.env.NODE_ENV === "development";
  const public_url = isDev
    ? "http://localhost:5005"
    : "https://kuturl.herokuapp.com";



  React.useEffect(() => {


    fetch(`${public_url}/?i=${shortId}`, {
      method: "GET",
    }).then((res) => {
      res.json().then((data) => {
        setUrl(data.url);
      });
    });
  }, [shortId]);

  if (url) {
    window.location.href = url;
    fetch('https://api.ipify.org/?format=json')
    .then(response => response.json())
    .then(data => setIp(data.ip));
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

  return (
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
        animationData={require("./loading.json")}
        style={{ width: "100px", height: "100px" }}
      />
      <h1 
        style={{
          color: "white",
          fontSize: "2rem",
          marginLeft: "1rem",
        }}
      >Almost there!</h1>

        {/* <Adsense 
        slot="8545615608"
        style={{ display: "block" }}
        format="auto"
        responsive="true"
        client="pub-5197012541210620"
      /> */}
      </div>
  );
}
