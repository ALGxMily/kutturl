import React from "react";
import { useNavigate, useParams, createSearchParams } from "react-router-dom";
import Lottie from "lottie-react";

export default function HandleRedirect() {
  const { shortId } = useParams();

  const [url, setUrl] = React.useState(null);

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
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Lottie
        animationData={require("./loading.json")}
        style={{ width: "100px", height: "100px" }}
      />
    </div>
  );
}
