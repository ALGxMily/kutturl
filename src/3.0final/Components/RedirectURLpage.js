import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getShortLink from "../ShortenSystem/functions/getShortLink";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useCallback } from "react";

export const RedirectURLpage = () => {
  const { shortId } = useParams();
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  const cleanup = () => {
    setUrl("");
    setStatus("loading");
    setError(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db, "links");
      const querySnapshot = await getDocs(collectionRef);
      if (querySnapshot.empty) {
        setError("No documents in collection.");
        setStatus("error");
        console.log("No documents in collection.");
        return;
      }
      // const shortLinkFound = querySnapshot.forEach(async (doc) => {
      //   const arrayShortID = [];
      //   arrayShortID.push(doc.data().shortLink);

      //   if (arrayShortID.includes(shortId)) {
      //     setStatus("redirecting");
      //     setUrl(doc.data().link);
      //     window.location.replace(doc.data().link);
      //     return true;
      //   }

      // });

      // if (!shortLinkFound) {
      //   setError("No short link found");
      //   setStatus("error");
      //   console.log("No short link found");
      // }

      const isShortLinkPresent = querySnapshot.docs.some((doc) => {
        return doc.data().shortLink === shortId;
      });

      if (isShortLinkPresent) {
        const collectionRef = collection(db, "links");
        const querySnapshot = await getDocs(collectionRef);

        querySnapshot.docs.map((doc) => {
          if (doc.data().shortLink === shortId) {
            setStatus("redirecting");
            setUrl(doc.data().link);
            window.location.replace(doc.data().link);
          }
        });
      }
    };
    fetchData().then(() => {
      cleanup();
    });
  }, [shortId]);

  return (
    <>
      {status === "loading" && <h1>Loading...</h1>}
      {status === "error" && <h1>{error}</h1>}
      {status === "success" && <h1>redirecting...</h1>}
      {status === "redirecting" && <h1>{url}</h1>}
    </>
  );
};
