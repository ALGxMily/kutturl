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
import {
  Add,
  Close,
  Copy,
  CopyOutline,
  ExitOutline,
  Pencil,
} from "react-ionicons";
import Lottie from "lottie-react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { auth } from "./firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signOut } from "firebase/auth";
import { Button, Tab, Toolbar } from "@mui/material";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
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
  const refEdit = React.useRef(null);
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
  const notifyEdit = (message, time) => {
    try {
      toast.info(`${message}`, {
        toastId: "edit",
        position: "top-center",
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        closeButton: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const [time, setTime] = React.useState(false);
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
  }, [!loading]);
  const [dataUser, setData] = React.useState([]);
  const [errorData, setError] = React.useState("");
  const isDev = process.env.NODE_ENV === "development";
  const public_url = isDev
    ? "http://localhost:5005"
    : "https://kuturl.herokuapp.com";

  const wrapperRef = React.useRef(null);

  React.useEffect(() => {
    const handleResize = () => {
      const inputName = document.getElementById("inputName");

      if (window.innerWidth < 768) {
        inputName.style.width = "20vw";
      } else if (window.innerWidth > 768) {
        inputName.style.width = "8vw";
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
  const saveName = (key) => {
    dataUser.forEach((element) => {
      if (element.key === key) {
        fetch(`${public_url}/update?key=${key}&uuid=${userUID}&name=${text}`, {
          method: "PUT",
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
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      refEdit.current.style.display = "none";
      refButton.current.style.display = "flex";
      const toastID = "edit";
      toast.dismiss(toastID);
    }
  };
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [wrapperRef]);

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [userUID]);
  const [text, setText] = React.useState("");
  const focused = React.useRef(null);
  const refButton = React.useRef(null);
  const [popUpMenu, setPopUpMenu] = React.useState(false);
  const user = auth.currentUser;
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
  }, [!loading]);
  const logout = async () => {
    setLoading(true);
    try {
      auth.signOut().then(() => {
        setLoading(false);
        navigateTo("/login");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="App" ref={wrapperRef}>
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
                    <td id="name">
                      <div className="urlContaineTitleMobile">
                        {/* <p onClick={() => copy(key)}>{name}</p> */}
                        <input
                          key={key}
                          ref={refButton === key ? refButton : null}
                          id={`inputName${key}`}
                          className="inputName"
                          type="text"
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            outline: "none",
                            color: "#c29a2d",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            cursor: "pointer",
                            width: "8vw",
                          }}
                          value={name}
                          readOnly
                          onFocus={() => {
                            focused.current = key;
                          }}
                          onBlur={() => {
                            focused.current = null;
                          }}
                          onKeyDown={(e) => {
                            //if its clicked mouse1

                            if (e.key === "Enter") {
                              refButton.current.click();
                            }
                          }}
                        />
                        <input
                          key={key}
                          ref={refEdit === key ? refButton : null}
                          id={`inputNameEdit${key}`}
                          className="inputNameEdit"
                          type="text"
                          style={{
                            display: "none",
                            backgroundColor: "transparent",
                            border: "none",
                            outline: "none",
                            color: "#c29a2d",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            cursor: "pointer",
                            width: "8vw",
                          }}
                          placeholder={name}
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          onFocus={() => {
                            focused.current = key;
                          }}
                          onBlur={() => {
                            focused.current = null;
                          }}
                          onKeyDown={(e) => {
                            //if its clicked mouse1

                            if (e.key === "Enter") {
                              saveName(key, text);
                              const inputName = document.getElementById(
                                "inputName" + key
                              );
                              const inputNameEdit = document.getElementById(
                                "inputNameEdit" + key
                              );
                              inputName.style.display = "block";
                              inputNameEdit.style.display = "none";
                            }
                          }}
                        />
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
                      <Tooltip
                        title="Edit"
                        placement="top"
                        arrow
                        style={{ cursor: "pointer" }}
                      >
                        <Button>
                          <Pencil
                            color={"#c29a2d"}
                            style={{
                              cursor: "pointer",
                              position: "relative",
                            }}
                            onClick={() => {
                              notifyEdit(
                                "Edit mode\nPress enter to save!",
                                false
                              );
                              const inputName = document.getElementById(
                                "inputName" + key
                              );
                              inputName.style.display = "none";
                              const inputNameEdit = document.getElementById(
                                "inputNameEdit" + key
                              );
                              inputNameEdit.style.display = "block";
                              inputNameEdit.focus();
                            }}
                          />
                        </Button>
                      </Tooltip>
                      <Tooltip
                        title="Delete"
                        placement="top"
                        arrow
                        style={{ cursor: "pointer" }}
                      >
                        <Button>
                          <Close
                            style={{
                              cursor: "pointer",
                            }}
                            height="25px"
                            width="25px"
                            color={"red"}
                            onClick={() => deleteURL(key)}
                          />
                        </Button>
                      </Tooltip>
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
