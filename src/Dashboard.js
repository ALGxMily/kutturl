import AnimatedBg from "react-animated-bg";
import "./App.css";
import ButtonShort, { FinalPage } from "./ButtonLoader/ButtonShort";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { Add, ExitOutline } from "react-ionicons";
import Lottie from "lottie-react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { auth } from "./firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signOut } from "firebase/auth";
import { Button } from "@mui/material";
function PopUpMenu() {
  const logout = async () => {
    await auth.signOut();
  };
  return (
    <ul className="drop-down">
      <li>
        <a style={{ color: "white" }} onClick={logout}>
          Log out
        </a>
      </li>
    </ul>
  );
}
export default function Dashboard() {
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [session, setSession] = React.useState(false);
  const loadingRef = React.useRef(null);
  const navigateTo = useNavigate();
  const location = useLocation();
  const notifyErrorGlobal = (error) => {
    try {
      toast.error(`Error-${error}`, {
        position: "top-center",
        autoClose: 3000,
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
  React.useEffect(() => {
    if (loading) {
      const logo = document.getElementById("logo");
      const loadingLottie = document.getElementById("loading");
      const container = document.getElementById("containerDashboard");
      const logoHeader = document.getElementById("logoHeader");

      loadingLottie.className = "loading";
      logoHeader.style.display = "none";
      logo.className = "logo_loading";
      container.className = "container_loading";
    } else {
      const logo = document.getElementById("logo");
      const container = document.getElementById("containerDashboard");

      const logoHeader = document.getElementById("logoHeader");
      const loadingLottie = document.getElementById("loading");

      loadingLottie.style.display = "none";
      logoHeader.style.display = "flex";
      logo.className = "logo";
      container.className = "contentWrapDashboard";

      logo.style.display = "none";
    }
  }, [loading]);
  const wrapperRef = React.useRef(null);

  const grid = new Grid({
    columns: ["Created", "URL", "Uses"],
    server: {
      url: "https://swapi.dev/api/films/",
      then: (data) =>
        data.results.map((movie) => [
          movie.title,
          movie.director,
          movie.producer,
        ]),
    },
    style: {
      table: {
        "margin-top": "4vh",
        border: "3px solid transparent",
        backgroundColor: "transparent",
      },
      th: {
        "font-size": "1.2rem",
        "background-color": "#121212",
        color: "#FBBD12",
        "border-bottom": "3px solid #FBBD12",
        "text-align": "left",
      },
      td: {
        "font-size": "1.2rem",
        "text-align": "center",
        "border-bottom": "3px solid rgba(255, 255, 255, 0.1)",
        "background-color": "#121212",
        borderRight: "none",
        borderWith: "none",
        color: "#fff",
      },
    },
  });
  const isDev = process.env.NODE_ENV === "development";
  const public_url = isDev
    ? "http://localhost:5005"
    : "https://kuturl.herokuapp.com";
  React.useEffect(() => {
    grid.render(wrapperRef.current);
    const user = auth.currentUser;
    const uuid = user.uid;
    fetch(`${public_url}/shorturl?uuid=${uuid}`, {
      method: "GET",
    }).then((res) => {
      console.log(res);
    });
  });
  const [text, setText] = React.useState("");
  const focused = React.useRef(null);
  const refButton = React.useRef(null);
  const [popUpMenu, setPopUpMenu] = React.useState(false);
  const user = auth.currentUser;
  const menu = () => {
    setPopUpMenu(!popUpMenu);
  };
  const goToLogin = () => {
    setLoading(true);
    navigateTo("/login");
  };
  React.useEffect(() => {
    setLoading(true);
    auth.onAuthStateChanged((user) => {
      try {
        setUsername(user.displayName);
        setSession(!!user);
        setLoading(false);
      } catch (error) {
        console.log("error " + error);
        setSession(false);
        setLoading(false);
      }
    });
  }, []);
  const logout = async () => {
    setLoading(true);
    auth
      .signOut()
      .then(() => {
        window.location.reload();
      })
      .finally(() => {
        navigateTo("/");
        setLoading(false);
      });
  };
  const loadURL = async () => {
    if (!text) {
      setLoading(false);
      return;
    }
    setLoading(true);
  };
  return (
    <>
      <div className="App">
        <div className="App-header" id="logoHeader">
          <img onClick={() => navigateTo("/")} src="logo-center.svg" />
        </div>
      </div>
      <div className="contentWrapDashboard" id="containerDashboard">
        <div className="containerHeaderDashboard">
          <div className="leftHeader">
            <h1>My URLs</h1>
            <Button
              style={{
                backgroundColor: "#FBBD12",
                color: "#121212",
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "10px",
                marginLeft: "3rem ",
                padding: "0.5rem 1rem",
                marginBottom: ".5rem",
              }}
              startIcon={
                <Add
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
              onClick={() => alert("Hi!")}
              variant="contained"
              className="buttonNew"
            >
              New URL
            </Button>
          </div>
          <div className="rightHeader">
            <p>{username}</p>
            <ExitOutline color={"#fff"} height="25px" width="25px" />
          </div>
        </div>
        <div className="containerTable">
          <div ref={wrapperRef} />
        </div>
      </div>
      <div id="logo">
        <img src="logo-center.svg" />
      </div>
      <Lottie
        id="loading"
        className="loading_before"
        ref={loadingRef}
        animationData={require("./loading.json")}
        width={100}
        height={100}
      />
    </>
  );
}
