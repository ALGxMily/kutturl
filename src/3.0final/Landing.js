import React, { useEffect } from "react";
import "./LandingStyle.css";
import { urlShortner } from "./ShortenSystem/urlShortner";
import Lottie from "lottie-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, provider } from "./firebase.config";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton } from "@mui/base/MenuButton";
import { MenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { Modal } from "@mui/base/Modal";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import { saveUser } from "./ShortenSystem/functions/saveToDB";

export default function Landing() {
  const [user, setUser] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [userProfilePic, setUserProfilePic] = React.useState(null); // user.photoURL
  const [link, setLink] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [shortLink, setShortLink] = React.useState("");
  const [loadingLogin, setLoadingLogin] = React.useState(false);
  const [id, setId] = React.useState("");
  const [isMobile, setIsMobile] = React.useState(false);

  const navigate = useNavigate();

  const signIn = () => {
    setLoadingLogin(true);
    document.querySelector(".profileContent").style.display = "none";
    auth
      .signInWithRedirect(provider)
      .catch((error) => {
        console.log(error);
        document.querySelector(".profileContent").style.display = "flex";
        setLoadingLogin(false);
      })
      .then((result) => {
        setUser(result.user);
        setUserProfilePic(result.user.photoURL);
      })
      .finally(() => {
        setLoadingLogin(false);
        document.querySelector(".profileContent").style.display = "flex";
        auth.setPersistence("session");
      });
  };

  const signOut = () => {
    auth.signOut().then(() => {
      setUser(null);
      setUserProfilePic(null);
    });
  };

  useEffect(() => {
    document.querySelector(".profileContent").style.display = "none";
    setLoadingLogin(true);
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const { status, data } = await saveUser(user);

        setUserProfilePic(data?.userPhoto);

        setLoadingLogin(false);
        document.querySelector(".profileContent").style.display = "flex";
      } else {
        setUser(null);
        setUserProfilePic(null);
        setLoadingLogin(false);
        document.querySelector(".profileContent").style.display = "flex";
      }
    });

    // keyboard mobile fix
    const metaViewport = document.querySelector('meta[name="viewport"]');
    metaViewport.setAttribute(
      "content",
      "width=device-width, initial-scale=1.0, maximum-scale=0.85, user-scalable=yes"
    );
  }, []);

  useEffect(() => {
    if (modalOpen) {
      document.querySelector(".content").style.filter = "blur(5px)";
    } else {
      document.querySelector(".content").style.filter = "blur(0px)";
    }
  }, [modalOpen]);

  const notify = () =>
    toast(
      "Copied to clipboard!",
      {
        bodyStyle: {
          color: "#b9b8bc",
          backgroundColor: "#20174a",
        },
        progressStyle: {
          backgroundColor: "#d4adfc",
        },
        style: {
          backgroundColor: "#20174a",
        },

        type: "success",
        autoClose: 2000,
      },
      {
        position: "bottom-center",
      }
    );
  const errorLink = () =>
    toast(
      "Invalid link!",
      {
        bodyStyle: {
          color: "#b9b8bc",
          backgroundColor: "#20174a",
        },
        progressStyle: {
          backgroundColor: "#d4adfc",
        },
        style: {
          backgroundColor: "#20174a",
        },

        type: "error",
        autoClose: 2000,
      },
      {
        position: "bottom-center",
      }
    );
  const successLink = () =>
    toast(
      "Success!",
      {
        bodyStyle: {
          color: "#b9b8bc",
          backgroundColor: "#20174a",
        },
        progressStyle: {
          backgroundColor: "#d4adfc",
        },
        style: {
          backgroundColor: "#20174a",
        },

        type: "success",
        autoClose: 2000,
      },
      {
        position: "bottom-center",
      }
    );

  // when the page loads hide the class .textInputFinal
  React.useEffect(() => {
    document.querySelector(".textInputFinal").style.display = "none";
    document.querySelector(".textInput").style.display = "flex";
    setLink("");
  }, []);

  const copyFunc = (text) => {
    navigator.clipboard.writeText(text);
    notify();
  };

  const shortenLink = async () => {
    try {
      const isLinkValid = (await urlShortner(link)).statusLink;
      if (!isLinkValid) {
        setLoading(false);
        errorLink();
        console.log("invalid link1!!");
        return;
      }
      setLoading(true);
      const newLink = await (
        await urlShortner(link, auth.currentUser)
      ).shortLink;
      document.querySelector(".textInput").style.display = "none";
      setLoading(false);
      setId(newLink);
      setShortLink("kutturl.com/" + newLink);
      successLink();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="wrapper">
      <div className="background">
        <div className="circle"></div>
        <div className="circle1"></div>
        <div className="circle2"></div>

        <div className="content">
          <Modal
            open={modalOpen}
            onClose={() => {
              setModalOpen(false);
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              backgroundColor: "#20174a",
              borderRadius: 23,
              outline: "none",
              border: "none",
              padding: "1rem",
              width: "fit-content",
              height: "fit-content",
            }}
          >
            <div className="modalWrapper">
              <div
                className="modal"
                style={{
                  backgroundColor: "#20174a",
                  borderRadius: 23,
                  outline: "none",
                  border: "none",
                  padding: "1rem",
                  width: "fit-content",
                  height: "fit-content",
                }}
              >
                <h1
                  style={{
                    fontFamily: "Exo, sans-serif",
                    color: "#D4ADFC",
                    fontSize: "1.6rem",
                    fontWeight: "bold",
                  }}
                >
                  Are you sure you want to sign out?
                </h1>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-evenly",
                    marginTop: "1rem",
                  }}
                >
                  <button
                    onClick={() => {
                      signOut();
                      setModalOpen(false);
                    }}
                    className="button"
                    style={{
                      borderRadius: "10px",
                      outline: "none",
                      borderRight: "none",
                      border: "none",
                      padding: "1rem",
                      width: "fit-content",
                      height: "fit-content",
                      paddingLeft: "1.5rem",
                      paddingRight: "1.5rem",
                    }}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => {
                      setModalOpen(false);
                    }}
                    className="button"
                    style={{
                      borderRadius: "10px",
                      outline: "none",
                      borderRight: "none",
                      border: "none",
                      padding: "1rem",
                      width: "fit-content",
                      height: "fit-content",
                      paddingLeft: "1.5rem",
                      paddingRight: "1.5rem",
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </Modal>
          <ToastContainer />
          <div className="header">
            <img
              src="logo-center-new.svg"
              alt="logo"
              className="logo"
              width={250}
            />
            <div
              className="profile"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                padding: ".6rem",
                cursor: "pointer",
                borderRadius: 23,
                backgroundColor: "#20174a",
              }}
            >
              {loadingLogin && (
                <div
                  className="loadingLogin"
                  style={{
                    padding: ".6rem",
                    borderRadius: 23,
                    backgroundColor: "#20174a",
                  }}
                ></div>
              )}
              <div
                className="profileContent"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                {!user && (
                  <>
                    <p className="profileText">
                      <span
                        className="profileText"
                        style={{
                          fontFamily: "Exo, sans-serif",
                          color: "#D4ADFC",
                          fontWeight: "bold",
                        }}
                        onClick={() => {
                          signIn();
                        }}
                      >
                        Not logged in
                      </span>
                      .{" "}
                    </p>
                  </>
                )}
                {user ? (
                  <>
                    <Dropdown>
                      <MenuButton
                        style={{
                          fontFamily: "Exo, sans-serif",
                          color: "#D4ADFC",
                          fontWeight: "bold",
                          boxSizing: "border-box",
                          backgroundColor: "#20174a",
                          border: "none",
                          outline: "none",
                        }}
                      >
                        <img
                          src={userProfilePic}
                          alt="profile"
                          className="profilePic"
                          width={30}
                          height={30}
                          style={{
                            borderRadius: "50%",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                        />
                      </MenuButton>
                      <Menu
                        role="menu"
                        style={{
                          borderRadius: 23,
                          padding: ".6rem",
                          backgroundColor: "#20174a",
                          border: "none",
                          outline: "none",
                        }}
                      >
                        {" "}
                        <MenuItem
                          onClick={() => {
                            navigate("/dashboard");
                          }}
                          style={{
                            fontFamily: "Exo, sans-serif",
                            color: "#D4ADFC",
                            fontWeight: "bold",
                            cursor: "pointer",
                            boxSizing: "border-box",
                            padding: "2px",
                            margin: "2px 0px",
                            minWidth: "100px",
                            overflow: "auto",
                            outline: "none",
                            textAlign: "center",
                            borderBottom: "1px solid #D4ADFC",
                          }}
                        >
                          Dashboard
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setModalOpen(true);
                          }}
                          style={{
                            fontFamily: "Exo, sans-serif",
                            color: "#D4ADFC",
                            fontWeight: "bold",
                            cursor: "pointer",
                            boxSizing: "border-box",
                            padding: "2px",
                            margin: "2px 0px",
                            minWidth: "100px",
                            borderRadius: "12px",
                            overflow: "auto",
                            outline: "none",
                            textAlign: "center",
                          }}
                        >
                          Sign out
                        </MenuItem>
                      </Menu>
                    </Dropdown>

                    {/* <div className="menu">
                      <p
                        onClick={() => {
                          signOut();
                        }}
                        style={{
                          fontFamily: "Exo, sans-serif",
                          color: "#D4ADFC",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        Sign out
                      </p>
                    </div> */}
                  </>
                ) : (
                  <img
                    src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_"G"_Logo.svg'
                    alt="profile"
                    className="profilePic"
                    width={25}
                    height={25}
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                      cursor: "pointer",
                      backgroundColor: "#20174a",
                    }}
                    onClick={() => {
                      signIn();
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="mainTitle">
            <div className="chip">
              {!user && (
                <p>
                  <p>
                    Create an account to{" "}
                    <span
                      style={{
                        color: "#D4ADFC",
                        fontWeight: "bold",
                        fontSize: "1rem",
                      }}
                    >
                      customise
                    </span>{" "}
                    your links!
                  </p>
                </p>
              )}
              {user && (
                <p>
                  Logged in as{" "}
                  <span
                    style={{
                      color: "#D4ADFC",
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                  >
                    {user.displayName}
                  </span>
                </p>
              )}
            </div>
            <h1>
              Tired of long links? <br />
              Just <span className="kut">kutt</span> it!
            </h1>
            <div className="textInput">
              <input
                type="text"
                placeholder="Paste your link here"
                className="input"
                placeholderTextColor="#fff"
                color="#fff"
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  shortenLink();
                }}
                className="button"
              >
                Shorten link
              </button>
            </div>

            {loading && (
              <div className="loading">
                <Lottie animationData={require("../lottie/loadingPink.json")} />
              </div>
            )}

            {!loading && (
              <div className="textInputFinal">
                <input
                  type="text"
                  className="input"
                  color="#fff"
                  value={shortLink}
                  onClick={() => {
                    copyFunc(shortLink);
                    document.querySelector(".textInputFinal .input").select();
                    // remove outline from input on focus
                    document.querySelector(".textInputFinal .input").blur();
                  }}
                  onDoubleClick={() => {
                    window.open("https://" + shortLink);
                  }}
                />
                <button
                  onClick={() => {
                    copyFunc(shortLink);
                  }}
                  className="button"
                  id="copyLink"
                  style={{
                    borderRadius: "0",
                    borderRight: "none",
                  }}
                >
                  Copy Link
                </button>
                <button
                  onClick={() => {
                    window.open("https://" + shortLink);
                  }}
                  className="button"
                  id="openLink"
                  style={{
                    borderRadius: "0",
                    borderRight: "none",
                  }}
                >
                  Open link
                </button>
                <button
                  disabled={!user}
                  onClick={() => {
                    navigate("/customise/" + id);
                  }}
                  className="button"
                  id="customiseButton"
                  style={{
                    opacity: !user ? "0.5" : "1",
                    cursor: !user ? "not-allowed" : "pointer",
                  }}
                >
                  {user ? "🪄Customise " : "🔒Customise"}
                </button>
              </div>
            )}
          </div>
          <footer>
            <p>
              Made with 💜 by{" "}
              <a href="www.google.com" target="_blank">
                Dzhuliano Dimov
              </a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
