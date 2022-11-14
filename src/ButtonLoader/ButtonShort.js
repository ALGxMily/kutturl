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
  const notifyErrorGlobal = (error) => {
    try {
      toast.error(`Error ~ ${error}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.log(error);
    }
  };
  function openLinklink() {
    const user = auth.currentUser;
    const uuid = user.uid;
    console.log(text);
    //url regex TODO

    fetch(`${public_url}/shorturladd?url=${text}&uuid=${uuid}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error === "ERR_URL") {
          notifyErrorGlobal("Invalid URL");
        }

        console.log(response);
        setUrl(response.url);
        setKey(response.key);
        setLoading(true);
        document.title = "Loading...";
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
      document.title = "Loading...";
    } else {
      setUrl(searchParams.get("url"));
      console.log(searchParams.get("url"));
      loading.current = false;
      document.title = "KuttURL";
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
