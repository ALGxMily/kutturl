import React, { useEffect } from "react";
import Lottie from "lottie-react";
import loadingAnimation from "./loading.json";
import "../App.css";
import { CSpinner } from "@coreui/react";
import { Tooltip } from "rsuite";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  Outlet,
  useSearchParams,
  useParams,
  useOutletContext,
  createSearchParams,
  useNavigate,
} from "react-router-dom";
import { auth } from "../firebaseConfig";

export default function ButtonLoader({ text, buttonRef }) {
  const [loading, setLoading] = React.useState(false);
  const [url, setUrl] = React.useState(null);
  const [key, setKey] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [session, setSession] = React.useState(false);
  const [userUUID, setUserUUID] = React.useState("");
  const isDev = process.env.NODE_ENV === "development";
  const public_url = isDev
    ? "http://localhost:5005"
    : "https://kuturl.herokuapp.com";

  const navigateto = useNavigate();

  function openLinklink() {
    const user = auth.currentUser;
    const uuid = user.uid;
    fetch(`${public_url}/shorturladd?url=${text}&uuid=${uuid}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setUrl(response.url);
        setKey(response.key);
        setLoading(true);
        navigateto({
          pathname: `/finalpage`,
          search: createSearchParams({ url: response.key }).toString(),
        });
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        console.trace(err);
        setLoading(false);
      });
  }

  return (
    <>
      <div className="buttonWrap">
        <button
          ref={buttonRef}
          className="button"
          onClick={openLinklink}
          disabled={loading}
        >
          {loading && <span>Loading...</span>}
          {loading && <span></span>}
          {!loading && <span>Shorten</span>}
        </button>
      </div>
    </>
  );
}
export function FinalPage() {
  const [searchParams] = useSearchParams();
  const [url, setUrl] = React.useState("LOADING");
  const [tooltip, setTooltip] = React.useState(false);
  const navigateto = useNavigate();
  useEffect(() => {
    setUrl(searchParams.get("url"));
    console.log(searchParams.get("url"));
  }, [searchParams]);
  const shorturl = `https://kuturl.herokuapp.com/?i=${url}`;
  const copy = () => {
    navigator.clipboard.writeText(shorturl);
  };
  const redirectToProfile = () => {
    navigateto({
      pathname: `/urls`,
    });
  };
  return (
    <div className="finalPage">
      <h1>
        Click to copy
        <Tooltip title="Click to copy">
          <a href="#" onClick={() => copy()}>
            {shorturl}
          </a>
        </Tooltip>
      </h1>
      <button className="finalpageURLButton" onClick={redirectToProfile}>
        Your URLs
      </button>
    </div>
  );
}
