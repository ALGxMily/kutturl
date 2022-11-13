import React, { useEffect } from "react";
import Lottie from "lottie-react";
import loadingAnimation from "./loading.json";
import "../App.css";
import { CSpinner } from "@coreui/react";
import { Tooltip } from "rsuite";
import { ToastContainer, toast } from "react-toastify";
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
    console.log(text);
    //url regex

    let regex =
      "((http|https)://)(www.)?" +
      "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]" +
      "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)";
    if (!text.match(regex)) {
      window.location.reload();
      navigateto({
        pathname: `/`,
        search: createSearchParams({
          message: "invalid_request",
        }).toString(),
      });
    }
    fetch(`${public_url}/shorturladd?url=${text}&uuid=${uuid}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error === "ERR_URL") {
          console.log("Please enter a valid URL!");
          navigateto({
            pathname: `/`,
            search: createSearchParams({
              message: "invalid_request",
            }).toString(),
          });
        }

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
  const loading = React.useRef(false);
  const navigateto = useNavigate();
  const isDev = process.env.NODE_ENV === "development";
  const public_url = isDev ? "http://localhost:3000" : "http://kutturl.com";

  useEffect(() => {
    if (searchParams.get("url") === null) {
      loading.current = true;
    } else {
      setUrl(searchParams.get("url"));
      console.log(searchParams.get("url"));
      loading.current = false;
    }
  }, [searchParams]);
  const shorturl = `${public_url}/${url}`;
  const copy = () => {
    //copy text on http protocol workaround
    const el = document.createElement("textarea");
    el.value = shorturl;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    notifySuccessful("Copied to clipboard!");
  };
  const redirectToProfile = () => {
    navigateto({
      pathname: `/dashboard`,
    });
  };
  const notifySuccessful = (message) => {
    try {
      toast.success(`${message}`, {
        position: "top-center",
        autoClose: 1400,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="finalPage">
        <h1>
          Click to copy
          <Tooltip title="Click to copy">
            <a
              href="#"
              onClick={() => copy()}
              style={{
                aspectRatio: "1",
                width: "60%",
                color: "white",
              }}
            >
              {shorturl}
            </a>
          </Tooltip>
        </h1>
        <button className="finalpageURLButton" onClick={redirectToProfile}>
          Your URLs
        </button>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="dark"
        />
      </div>
      <Lottie
        id="loadingURL"
        ref={loading}
        animationData={require("./loading.json")}
        width={100}
        height={100}
      />
    </>
  );
}
