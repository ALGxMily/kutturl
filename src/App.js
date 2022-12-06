import "./App.css";
import AnimatedBg from "react-animated-bg";
import ButtonShort, { FinalPage } from "./ButtonLoader/ButtonShort";
import React from "react";
import Snowfall from "react-snowfall";
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import Ad from "./GoogleAd";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Lottie from "lottie-react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { auth } from "./firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signOut } from "firebase/auth";
import NotFound from "./404";
import { Button } from "@mui/material";
import Tippy from "@tippyjs/react";
import Joyride from "react-joyride";
import "tippy.js/dist/tippy.css"; // optional
import { ArrowForward, ExitOutline, Heart, InformationCircleOutline } from "react-ionicons";
import HandleRedirect from "./HandleRedirect";
import ResponsiveNativeAds from "./GoogleAd";
import MyLeaderBoardAd from "./GoogleAd";
import createAndAppendAdsElement from "./GoogleAd";
import linkShortner from "./Linkshortner";
import Modal from "./Modal";
import KutturlTips from "./Components/KutturlTips";

function App() {
  return (
    <Routes>
      <Route exact path="/:shortId" element={<HandleRedirect />} />
      <Route exact path="/" element={<Home />} />
      <Route path="/app" element={<Home />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="/urls" element={<Urls />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/finalpage" element={<FinalPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
function Home() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = React.useState(true);
  const [shortnerLoading, setShortnerLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [session, setSession] = React.useState(false);
  const [buttonText, setButtonText] = React.useState("Shorten");
  const [link, setLink] = React.useState(false);
  const loadingRef = React.useRef(null);
  const navigateTo = useNavigate();
  const location = useLocation();
  const [show, setShow] = React.useState(false);
  const notifyError = () => {
    try {
      toast.error("Please enter a valid URL!", {
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
  const notifyErrorGlobal = (error) => {
    try {
      toast.error(`${error}`, {
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
      const header = document.getElementById("header");
      const logo = document.getElementById("logo");
      const loadingLottie = document.getElementById("loading");
      const container = document.getElementById("container");
      const logoHeader = document.getElementById("logoHeader");

      loadingLottie.className = "loading";
      logoHeader.style.display = "none";
      header.className = "header_loading";
      logo.className = "logo_loading";
      container.className = "container_loading";
    } else {
      const logo = document.getElementById("logo");
      const container = document.getElementById("container");
      const header = document.getElementById("header");
      const logoHeader = document.getElementById("logoHeader");
      const loadingLottie = document.getElementById("loading");

      loadingLottie.style.display = "none";
      logoHeader.style.display = "flex";
      header.className = "inputWrap";
      logo.className = "logo";
      container.className = "contentWrap";
      logo.style.display = "none";

      //if on a mobile device, show dashboardAMobile
    }
    setSteps(stepsScreenApp);
  }, [loading]);

  const [text, setText] = React.useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const focused = React.useRef(null);
  const refButton = React.useRef(null);
  const [popUpMenu, setPopUpMenu] = React.useState(false);
  const [copiedLink, setCopiedLink] = React.useState(false);
  const handleKeyPress = React.useCallback((event) => {
    if (event.ctrlKey === true && event.key === "v") {
      toast.success(`Link pasted!`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      focused.current.focus();
      navigator.clipboard
        .readText()
        .then((text) => {
          setText(text);
          console.log("Pasted content: ", text);
          if (refButton.current) {
            refButton.current.click();
          } else {
            console.log("no ref");
          }
        })
        .catch((err) => {
          console.error("Failed to read clipboard contents: ", err);
          notifyErrorGlobal(err);
        });
    }
  }, []);
  const copyFunction = () => {
    setCopiedLink(true);
    navigator.clipboard.writeText(text)
      ? toast.success(`Link copied!`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      : toast.error(`Link not copied!`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
    setTimeout(() => {
      setCopiedLink(false);
    }, 1100);
  };
  const goToLogin = () => {
    setLoading(true);
    navigateTo("/login");
  };
  const loadURL = async () => {
    const user = auth.currentUser;
    let uuid;
    if (user) {
      uuid = user.uid;
    } else {
      uuid = "guest";
    }

    if (text === "") {
      notifyError();
      return;
    }
    setShortnerLoading(true);
    linkShortner(text, uuid?.toString())
      .catch(() => {
        notifyErrorGlobal("Something went wrong!");
      })
      .then((res) => {
        if (res.success) {
          setShortnerLoading(false);
          setText(res.shortUrl);
          setButtonText("Done!");
          setTimeout(() => {
            setLink(true);
          }, 1000);

          if (uuid !== "guest") {
            toast.success(`Link saved!`, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        }
        setModalShow(true);
      })
      .finally(() => {
        setShortnerLoading(false);
        setButtonText("Shorten");
      });
  };
  const stepsScreenApp = [
    {
      target: "#inputSection",
      content: "Enter a URL to get started!",
    },
    {
      target: "#button",
      content: "Click here to shorten your URL!",
    },
    {
      target: "#dashboardSection",
      content: "Click here to access your dashboard!",
    },
    {
      target: "#loginSection",
      content: "Click here to login or register!",
    },
    {
      target: "#disclaimer",
      content: (
        <p>
          This is a small project made for fun{"\n"}
          <br />
          and learning purposes!If you find any bugs, please report them to dgiuliano@yandex.com{"\n"}Any suggestions
          are welcome!{"\n"}Enjoy!
        </p>
      ),

      onclick: () => {
        setJoyride({ ...joyride, run: false });
      },
    },
  ];
  const [steps, setSteps] = React.useState([]);
  const [run, setRun] = React.useState(true);
  const HandleJoyRideCallback = (data) => {
    const { status, type } = data;
    const finishedStatuses = [status.FINISHED, status.SKIPPED];

    if (finishedStatuses.includes(status)) {
      console.log("finished");
      setJoyride({ ...joyride, run: false });
    }
  };
  const [joyride, setJoyride] = React.useState({
    run: false,
    steps: stepsScreenApp,
    continuous: true,
    showProgress: false,
    showSkipButton: true,

    styles: {
      options: {
        zIndex: 10000,
        backgroundColor: "#1F1F1F",
        primaryColor: "#DDA200",
        textColor: "white",
        borderRadius: "15px",
      },

      buttonNext: {
        backgroundColor: "#FBBD12",
        color: "black",
      },
      buttonBack: {
        backgroundColor: "#FBBD12",
        color: "black",
      },
      buttonClose: {
        backgroundColor: "#1F1F1F",
        color: "white",
      },
      buttonSkip: {
        backgroundColor: "#FBBD12",
        color: "black",
      },
    },
  });

  React.useEffect(() => {
    const inputBox = document.getElementById("input");
    //if input is clicked focused.current.select()
    inputBox.addEventListener("click", () => {
      focused.current.select();
    });
    if (!loading) {
      setSteps(stepsScreenApp);
    }
    const handleResize = () => {
      const dashboardAMobile = document.getElementById("dashboardAMobile");

      if (window.innerWidth < 768) {
        dashboardAMobile.style.display = "flex";
        setShow(false);
      } else if (window.innerWidth > 768) {
        dashboardAMobile.style.display = "none";
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    if (text === "") {
      setButtonText("Shorten");
    }
    setLoading(true);
    document.title = "Kutturl";
    auth.onAuthStateChanged((user) => {
      try {
        setUsername(user.displayName);
        setJoyride({ ...joyride, run: false });
        setSession(!!user);
        setLoading(false);
        document.title = "Kutturl | Home";
      } catch (error) {
        setJoyride({ ...joyride, run: true });
        setSession(false);
        setLoading(false);
        setShow(true);
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

  React.useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
  const menu = () => {
    setPopUpMenu(!popUpMenu);
  };

  //return a map of ads to be displayed

  return (
    <>
      <Snowfall
        color="#fff"
        style={{ background: "transparent" }}
        snowflakeCount={140}
        animationSpeed={2}
        snowflakeSize={3}
        snowflakeSpeed={2}
        snowflakeRandomness={4}
        changeFrequency={200}
      />
      <div className="App">
        <div className="App-header" id="logoHeader">
          <img src="logo-center.svg" />

          {session ? (
            <>
              <a className="mobileUsername">
                Logged in as {username}
                <ExitOutline
                  onClick={logout}
                  color="#FBBD12"
                  style={{
                    cursor: "pointer",
                    top: "3px",
                    marginLeft: "5px",
                    position: "relative",
                  }}
                />
              </a>
              <a
                style={{
                  color: "#FBBD12",
                  alignItems: "center",
                  cursor: "pointer",
                  marginTop: "10px",
                  display: "none",
                }}
                className="mobile_dashboard"
                id="dashboardAMobile"
                href="/dashboard"
              >
                Dashboard
                <ArrowForward
                  onClick={() => navigateTo("/dashboard")}
                  color="#FBBD12"
                  style={{
                    cursor: "pointer",
                    top: "3px",
                    marginLeft: "2px",
                    position: "relative",
                  }}
                />
              </a>
            </>
          ) : (
            <a
              style={{
                textDecoration: "underline",
                color: "white",
              }}
              href="/login"
              className="mobileUsername"
            >
              Click here to login
            </a>
          )}
          <div className="inputWrap" id="header">
            <li>
              <a id="dashboardSection" href={!session ? "/login" : "/dashboard"}>
                <Joyride
                  callback={HandleJoyRideCallback}
                  run={joyride.run}
                  steps={joyride.steps}
                  continuous={joyride.continuous}
                  showProgress={joyride.showProgress}
                  showSkipButton={joyride.showSkipButton}
                  styles={joyride.styles}
                />
                Dashboard
              </a>
            </li>
            <li>
              {!session ? (
                <>
                  <a id="loginSection" style={{ cursor: "pointer" }} onClick={goToLogin}>
                    Log-in
                  </a>
                </>
              ) : (
                <>
                  <a id="loginSection" style={{ cursor: "pointer" }} onClick={() => menu()}>
                    <Joyride
                      callback={HandleJoyRideCallback}
                      run={joyride.run}
                      steps={joyride.steps}
                      continuous={joyride.continuous}
                      showProgress={joyride.showProgress}
                      showSkipButton={joyride.showSkipButton}
                      styles={joyride.styles}
                    />
                    {username}
                  </a>
                  {popUpMenu && PopUpMenu()}
                </>
              )}
            </li>
          </div>
        </div>
      </div>
      <div className="contentWrapApp" id="container">
        {/* <Modal show={modalShow} children={text} /> */}
        <div className="content">
          <h2>Easy, convenient, prettier</h2>
          <p>Shorten your URLs like a boss.</p>
        </div>
        <div className="inputWrap" id="inputSection">
          <Joyride
            callback={HandleJoyRideCallback}
            run={joyride.run}
            steps={joyride.steps}
            continuous={joyride.continuous}
            showProgress={joyride.showProgress}
            showSkipButton={joyride.showSkipButton}
            styles={joyride.styles}
          />
          <input
            //clear button
            itemType="url"
            ref={focused}
            value={text}
            onChange={(text) => setText(text.target.value)}
            type="search"
            placeholder="Paste your link here"
            id="input"
          ></input>
          <a id="button" onClick={!link ? loadURL : copyFunction}>
            <div className="buttonWrap">
              {link ? (
                <button className="button">{copiedLink ? "✔️ Copied" : "Copy"}</button>
              ) : (
                <button className="button">
                  {shortnerLoading ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Spinner />
                    </div>
                  ) : (
                    <div>{buttonText}</div>
                  )}
                </button>
              )}
            </div>
            <Joyride
              callback={HandleJoyRideCallback}
              run={joyride.run}
              steps={joyride.steps}
              continuous={joyride.continuous}
              showProgress={joyride.showProgress}
              showSkipButton={joyride.showSkipButton}
              styles={joyride.styles}
            />
          </a>
        </div>
      </div>
      <div id="logo">
        <object data="logo-center.svg" />
      </div>
      {/* <Ad /> */}
      <div className="tipsWrap">
        <KutturlTips controlShow={show} />
      </div>
      <footer>
        <div className="footerWrap">
          <div className="footerContent" id="disclaimer">
            <Joyride
              callback={HandleJoyRideCallback}
              run={joyride.run}
              steps={joyride.steps}
              continuous={joyride.continuous}
              showProgress={joyride.showProgress}
              showSkipButton={joyride.showSkipButton}
              styles={joyride.styles}
            />
            <p>
              Made with <Heart color="#FBBD12" style={{ position: "relative", top: "2px" }} /> by{" "}
              <a target={"_blank"} href="https://github.com/ALGxMily" style={{ color: "#fff", textDecoration: "none" }}>
                Dzhuliano
              </a>
            </p>
          </div>
        </div>
      </footer>
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
function Urls() {
  return (
    <div className="apiWrap">
      <h1>API</h1>
      <p>Our API is free to use and easy to integrate. You can use it to shorten links, get analytics, and more.</p>
    </div>
  );
}
export default App;
