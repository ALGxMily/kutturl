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
import updateShortLink from "./ShortenSystem/functions/updateShortLink";
import checkLinkExist from "./ShortenSystem/functions/checkLinkExist";
import { redirect, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NotFound from "./404";
import confirmAnimation from "../lottie/confirm.json";
import { validateNewKey } from "./ShortenSystem/functions/validation";
import { AuthState } from "./ShortenSystem/AuthState";

// get the shortId from the url

export default function Customise() {
  const { shortId } = useParams();
  const [linkExist, setLinkExist] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [newShortId, setNewShortId] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [userProfilePic, setUserProfilePic] = React.useState(null); // user.photoURL
  const [loadingLogin, setLoadingLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [linkChanged, setLinkChanged] = React.useState(false);
  const navigate = useNavigate();
  const signIn = () => {
    setLoadingLogin(true);
    auth
      .signInWithPopup(provider)
      .catch((error) => {
        console.log(error);
        setLoadingLogin(false);
      })
      .then((result) => {
        setUser(result.user);
        setUserProfilePic(result.user.photoURL);
      })
      .finally(() => {
        setLoadingLogin(false);

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
    checkLinkExist(shortId).then((result) => {
      if (!result) {
        setLinkExist(false);
        setLoading(false);
      }
      if (result) {
        setLinkExist(true);
        setLoading(false);
      }
    });
  }, [shortId]);

  useEffect(() => {
    console.log(shortId);
    setLoadingLogin(true);
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setUserProfilePic(user.photoURL);
        setLoadingLogin(false);
      } else {
        setUser(null);
        setUserProfilePic(null);
        setLoadingLogin(false);
        redirect("/404");
      }
    });
  }, [loadingLogin]);

  useEffect(() => {
    if (modalOpen) {
      document.querySelector(".content").style.filter = "blur(5px)";
    } else {
      document.querySelector(".content").style.filter = "blur(0px)";
    }
  }, [modalOpen]);

  const updateLink = async (newShortId) => {
    if (!user) {
      toast.error("Please login to customise your link", {
        position: "bottom-center",
      });
      return;
    }

    if (!newShortId) {
      toast.error("Please enter a valid key", { position: "bottom-center" });
      return;
    }
    const { statusKey, errorKey } = validateNewKey(newShortId);
    if (!statusKey) {
      toast.error(errorKey, { position: "bottom-center" });
      return;
    }

    const { status } = await updateShortLink(shortId, newShortId);
    if (status) {
      console.log("Link updated successfully");
      setLinkChanged(true);
    } else {
      console.log("Link updation failed");
      toast.error("Link updation failed", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="wrapper">
      <div className="background">
        <div className="circle"></div>
        <div className="circle1"></div>
        <div className="circle2"></div>
        {!loading && !linkExist && <NotFound />}

        <div className="content">
          <ToastContainer />
          {loading && (
            <div
              className="loading"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <h1
                style={{
                  fontFamily: "Exo, sans-serif",
                  color: "#D4ADFC",
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                }}
              >
                Loading...
              </h1>
            </div>
          )}
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
          <header className="header">
            <svg
              width="235"
              height="37"
              viewBox="0 0 235 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: "pointer" }}
              onClick={() => {
                window.location.href = "/";
              }}
            >
              <path
                d="M30.3074 35.5751L15.3128 16.7656L29.3383 0.125013L18.9742 0.128631L8.40223 13.5259L8.39756 0.132323L0 0.135254L0.00836719 24.1055L8.40223 13.5259L8.40459 20.2758L19.9964 35.5787L30.3074 35.5751ZM8.40641 25.4844L0.0123745 35.5857L8.40993 35.5828L8.40641 25.4844Z"
                fill="#D4ADFC"
              />
              <path
                d="M59.0452 0.114302L59.0526 21.1613C59.0542 25.8916 56.3446 28.6563 51.6143 28.658C46.884 28.6596 44.1193 25.8968 44.1177 21.1665L44.1103 0.119516L35.6065 0.122484L35.6139 21.4353C35.6169 30.1517 40.8277 36.2089 51.6169 36.2051C62.4062 36.2014 67.6127 30.1405 67.6096 21.3178L67.6022 0.0581673L59.0452 0.0611543L59.0452 0.114302Z"
                fill="#D4ADFC"
              />
              <path
                d="M72.873 0.109375L72.8757 7.60339L82.8145 7.59993L82.8243 35.5563L91.275 35.5534L91.2652 7.59698L101.151 7.59352L101.148 0.0995051L72.873 0.109375Z"
                fill="#D4ADFC"
              />
              <path
                d="M106.508 0.0976562L106.51 7.59168L116.449 7.58821L116.459 35.5446L124.91 35.5417L124.9 7.58526L134.786 7.58181L134.783 0.0877863L106.508 0.0976562Z"
                fill="#D4ADFC"
              />
              <path
                d="M163.579 0.0776812L163.587 21.1247C163.588 25.855 160.879 28.6197 156.148 28.6213C151.418 28.623 148.654 25.8602 148.652 21.1299L148.645 0.0828945L140.141 0.0858629L140.148 21.3986C140.151 30.1151 145.362 36.1723 156.151 36.1685C166.94 36.1647 172.147 30.1039 172.144 21.2812L172.136 0.0215462L163.579 0.0245332L163.579 0.0776812Z"
                fill="#D4ADFC"
              />
              <path
                d="M198.143 22.0163C201.969 21.1114 205.901 17.7616 205.899 11.49C205.897 4.89954 201.324 0.0114268 193.99 0.013987L177.407 0.0197754L177.42 35.4702L185.817 35.4673L185.813 23.7745L189.959 23.773L196.447 35.5167L206.12 35.5133L198.143 22.0163ZM185.807 7.56401L192.823 7.56156C195.587 7.5606 197.288 9.10133 197.289 11.493C197.29 13.8316 195.536 15.4267 192.826 15.4276L185.81 15.4301L185.807 7.56401Z"
                fill="#D4ADFC"
              />
              <path
                d="M219.863 28.0145L219.854 0.0581038L211.456 0.0610352L211.468 35.5115L234.004 35.5036L234.001 28.0096L219.863 28.0145Z"
                fill="#D4ADFC"
              />
            </svg>
            <div
              className="profile"
              style={{
                display: "flex",
                alignItems: "center",
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
                  />
                )}
              </div>
            </div>
          </header>
          <div
            className="main"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="mainContent"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                className="mainContentLeft"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <h1
                  style={{
                    fontFamily: "Exo, sans-serif",
                    color: "#D4ADFC",
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                  }}
                >
                  Customise your link
                </h1>

                {!linkChanged && (
                  <div
                    className="inputWrapper"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",

                      alignItems: "center",
                      gap: "1rem",
                      height: "70vh",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Exo, sans-serif",
                        color: "#D4ADFC",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        maxWidth: "1000%",
                      }}
                    >
                      Choose a custom name for your link
                    </p>
                    <input
                      type="text"
                      className="input"
                      placeholder="Enter your custom name"
                      style={{
                        fontFamily: "Exo, sans-serif",
                        color: "#D4ADFC",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        outline: "none",
                        border: "none",
                        backgroundColor: "#20174a",
                        borderRadius: 23,
                        padding: ".6rem",
                        width: "100%",
                        maxWidth: "80%",
                      }}
                      onChange={(e) => {
                        setNewShortId(e.target.value);
                      }}
                    />
                    <button
                      className="button"
                      style={{
                        borderRadius: "10px",
                        outline: "none",
                        borderRight: "none",
                        border: "none",
                        padding: "1rem",
                        width: "fit-content",
                        maxHeight: "50px",
                        paddingLeft: "1.5rem",
                        paddingRight: "1.5rem",
                      }}
                      onClick={() => {
                        updateLink(newShortId);
                      }}
                    >
                      Customise
                    </button>
                  </div>
                )}
                {linkChanged && (
                  <div
                    className="linkChanged"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "1rem",
                      height: "70vh",
                    }}
                  >
                    <Lottie
                      animationData={confirmAnimation}
                      style={{
                        width: "50%",
                        height: "50%",
                      }}
                      autoPlay={false}
                      loop={false}
                      onClick={() => {
                        setLinkChanged(false);
                        navigate("/");
                      }}
                    />
                    <h1
                      style={{
                        fontFamily: "Exo, sans-serif",
                        color: "#D4ADFC",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                      }} // 1.5rem
                    >
                      Your new link is:
                      <span
                        style={{
                          fontFamily: "Exo, sans-serif",
                          color: "#D4ADFC",
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          cursor: "pointer",
                          shadow: "0px 0px 10px #D4ADFC",
                          outline: "none",
                          textDecoration: "underline",
                        }}
                        onClick={() => {
                          window.location.href = `/${newShortId}`;
                        }}
                      >
                        {" "}
                        {window.location.origin}/{newShortId}
                      </span>
                    </h1>
                  </div>
                )}
              </div>
              <div className="mainContentRight"></div>
            </div>
            <div className="mainContent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
