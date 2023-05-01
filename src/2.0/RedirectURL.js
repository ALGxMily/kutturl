import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import Lottie from "lottie-react";
import loadingAnimation from "../lottie/Link.json";

export default function RedirectURL() {
  const { shortId } = useParams();

  const [url, setUrl] = React.useState(null);

  const isDev = process.env.NODE_ENV === "development";
  const public_url = isDev ? "http://localhost:3000" : "https://kutturl.com";

  useEffect(() => {
    const fetchUrl = async () => {
      const docRef = doc(db, "urls", shortId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUrl(docSnap.data().url);
      } else {
        window.location.href = `${public_url}/404`;
      }
    };
    fetchUrl();
  }, [shortId]);

  if (url) {
    setTimeout(() => {
      window.location.href = url;
    }, 2000);
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
        animationData={loadingAnimation}
        style={{ width: "50%", height: "50%" }}
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
  );
}
