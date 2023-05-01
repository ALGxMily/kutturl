import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { doc, getDoc } from "firebase/firestore";

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
    window.location.href = url;
  }

  return <div>Redirecting to {url}</div>;
}
