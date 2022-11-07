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
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import "gridjs/dist/theme/mermaid.css";
import { Add, Close, Copy, CopyOutline, ExitOutline } from "react-ionicons";
import Lottie from "lottie-react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { auth } from "./firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signOut } from "firebase/auth";
import { Button, Tab } from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Table from "./Table";
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
  const [userUID, setUserUID] = React.useState("");
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserUID(user.uid);
      }
    });
    return unsubscribe;
  }, []);
  const [dataUser, setData] = React.useState([]);
  const [errorData, setError] = React.useState("");
  const isDev = process.env.NODE_ENV === "development";
  const public_url = isDev
    ? "http://localhost:5005"
    : "https://kuturl.herokuapp.com";

  const wrapperRef = React.useRef(null);
  const copy = (key) => {
    dataUser.forEach((element) => {
      if (element.key === key) {
        navigator.clipboard.writeText(`${public_url}?i=${key}`);
        notifySuccessful("Copied to clipboard");
      }
    });
  };
  const deleteURL = (key) => {
    dataUser.forEach((element) => {
      if (element.key === key) {
        fetch(`${public_url}/delete?key=${key}&uuid=${userUID}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              notifySuccessful(data.message);
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            } else {
              notifyErrorGlobal(data.error);
            }
          })
          .catch((error) => {
            notifyErrorGlobal(error);
          });
      }
    });
  };

  React.useEffect(() => {
    if (!userUID) return;
    fetch(`${public_url}/shorturl?uuid=${userUID}`, {
      method: "GET",
    })
      .then((res) => {
        res.json().then((data) => {
          if (data.error) {
            if (data.error === "EMPTY_LIST") {
              setError("It's time to create your first short URL!");
            }
            if (data.error === "INVALID_UUID") {
              setError("Invalid User");
            }
          } else {
            setData(data.data);
          }
        });
      })
      .catch((error) => {
        console.log(error);
        setError("Network error - please try again later...");
      });
  }, [userUID]);
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
        navigateTo("/");
      })
      .finally(() => {});
  };

  return (
    <>
      <div className="App">
        <div className="App-header" id="logoHeader">
          <img
            style={{ cursor: "pointer" }}
            onClick={() => navigateTo("/")}
            src="logo-center.svg"
          />
        </div>
      </div>
      <div className="contentWrapDashboard" id="containerDashboard">
        <div className="containerHeaderDashboard">
          <div className="leftHeader">
            <h1>My URLs</h1>
            <Button
              id="buttonNew"
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
              onClick={() => navigateTo("/")}
              variant="contained"
              className="buttonNewMobile"
            >
              New URL
            </Button>
          </div>
          <div className="rightHeader">
            <p>{username}</p>
            <ExitOutline
              color={"#c29a2d"}
              height="25px"
              width="25px"
              onClick={logout}
              style={{
                cursor: "pointer",
                top: "3px",
                position: "relative",
              }}
            />
          </div>
        </div>
        <div className={"tableContainer"}>
          {!errorData ? (
            <table>
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th id="dateTable">Date</th>
                  <th>Name</th>
                  <th>URL</th>
                  <th>Uses</th>
                </tr>
              </thead>
              <tbody>
                {dataUser.map(({ uses, key, date, name }) => (
                  <tr id="rowItems">
                    <td id="dateTable">
                      <b>{date.split("T")[0]} </b>
                    </td>
                    <td>
                      <div className="urlContaineTitleMobile">
                        <p onClick={() => copy(key)}>{name}</p>
                        <p id="copyIcon">
                          {/* <CopyOutline
                            style={{
                              cursor: "pointer",
                              top: "15x",
                              position: "relative",
                            }}
                            color={"#c29a2d"}
                          /> */}
                        </p>
                      </div>
                    </td>
                    <td key={key}>
                      <div className="urlContainerLink">
                        <span
                          className="linkDashboard"
                          onClick={() => copy(key)}
                          style={{
                            color: "#fff",
                            cursor: "pointer",
                            fontSize: "1rem",
                            overflow: "hidden",
                          }}
                        >
                          {public_url}?i=
                          <span
                            style={{
                              color: "#c29a2d",
                              fontWeight: "bold",
                              cursor: "pointer",
                              textDecoration: "none",
                            }}
                          >
                            {key}
                            <CopyOutline
                              style={{
                                cursor: "pointer",
                                position: "relative",
                              }}
                              color={"#c29a2d"}
                            />
                          </span>
                        </span>
                      </div>
                    </td>
                    <td>{uses}</td>
                    <td>
                      <Close
                        style={{
                          cursor: "pointer",
                        }}
                        color={"red"}
                        onClick={() => deleteURL(key)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h1
              style={{
                color: "#c29a2d",
                fontSize: "1.5rem",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "2rem",
              }}
            >
              {errorData}
            </h1>
          )}
        </div>
        <div className="footerButton">
          <Button
            id="buttonNewMobile"
            style={{
              display: "flex",
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
            className="buttonNewMobile"
          >
            New URL
          </Button>
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
