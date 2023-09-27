import React, { useEffect } from "react";
import "./LandingStyle.css";
import { urlShortner } from "./ShortenSystem/urlShortner";
import Lottie from "lottie-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, provider } from "./firebase.config";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Landing() {
  const [user, setUser] = React.useState(null);
  const [userProfilePic, setUserProfilePic] = React.useState(null); // user.photoURL
  const [link, setLink] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [shortLink, setShortLink] = React.useState("");
  const [loadingLogin, setLoadingLogin] = React.useState(false);
  const signIn = () => {
    setLoadingLogin(true);
    document.querySelector(".profileContent").style.display = "none";
    auth
      .signInWithPopup(provider)
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
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setUserProfilePic(user.photoURL);
        setLoadingLogin(false);
        document.querySelector(".profileContent").style.display = "flex";
      } else {
        setUser(null);
        setUserProfilePic(null);
        setLoadingLogin(false);
        document.querySelector(".profileContent").style.display = "flex";
      }
    });
  }, []);

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
    const isLinkValid = (await urlShortner(link)).statusLink;
    if (!isLinkValid) {
      setLoading(false);
      errorLink();
      return;
    }
    setLoading(true);
    const newLink = await (await urlShortner(link)).shortLink;
    document.querySelector(".textInput").style.display = "none";
    setLoading(false);
    setShortLink("kutturl.com/" + newLink);
    successLink();
  };

  return (
    <div className="wrapper">
      <div className="background">
        <div className="circle"></div>
        <div className="circle1"></div>
        <div className="circle2"></div>
        <div className="content">
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
              onClick={() => {
                user ? signOut() : signIn();
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
                    <p>
                      <span
                        style={{
                          fontFamily: "Exo, sans-serif",
                          color: "#D4ADFC",
                          fontWeight: "bold",
                        }}
                      >
                        Not logged in
                      </span>
                      .{" "}
                    </p>
                  </>
                )}
                {user ? (
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
                    Create an account to generate{" "}
                    <span
                      style={{
                        color: "#D4ADFC",
                        fontWeight: "bold",
                        fontSize: "1rem",
                      }}
                    >
                      unlimited
                    </span>{" "}
                    links!
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
              Just <span className="kut">kut</span> it!
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
                  disabled
                  onClick={() => {
                    // open link in new tab
                  }}
                />

                <button
                  onClick={() => {
                    copyFunc(shortLink);
                  }}
                  className="button"
                  style={{
                    borderRadius: "0",
                    borderRight: "none",
                  }}
                >
                  Copy Link
                </button>
                <button
                  onClick={() => {
                    // open on another tab function
                  }}
                  className="button"
                  style={{
                    borderRadius: "0",
                    borderRight: "none",
                  }}
                >
                  Open link
                </button>
                <button
                  disabled
                  onClick={() => {
                    // copy function
                  }}
                  className="button"
                  style={{
                    opacity: "0.5",
                    cursor: "not-allowed",
                  }}
                >
                  🔒 Customise
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
