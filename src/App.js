import "./App.css";
import AnimatedBg from "react-animated-bg";
import ButtonShort, { FinalPage } from "./ButtonLoader/ButtonShort";
import React from "react";
import Snowfall from "react-snowfall";
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
import {
  ArrowForward,
  ExitOutline,
  Heart,
  InformationCircleOutline,
} from "react-ionicons";
import HandleRedirect from "./HandleRedirect";
import ResponsiveNativeAds from "./GoogleAd";
import MyLeaderBoardAd from "./GoogleAd";
import createAndAppendAdsElement from "./GoogleAd";

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
  const [username, setUsername] = React.useState("");
  const [session, setSession] = React.useState(false);
  const loadingRef = React.useRef(null);
  const navigateTo = useNavigate();
  const location = useLocation();
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
  const focused = React.useRef(null);
  const refButton = React.useRef(null);
  const [popUpMenu, setPopUpMenu] = React.useState(false);
  const user = auth.currentUser;
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

  const goToLogin = () => {
    setLoading(true);
    navigateTo("/login");
  };
  const loadURL = async () => {
    if (text === "") {
      notifyError();
      return;
    }
    setLoading(true);
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
          and learning purposes!If you find any bugs, please report them to
          dgiuliano@yandex.com{"\n"}Any suggestions are welcome!{"\n"}Enjoy!
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
    if (!loading) {
      setSteps(stepsScreenApp);
    }
    const handleResize = () => {
      const dashboardAMobile = document.getElementById("dashboardAMobile");

      if (window.innerWidth < 768) {
        dashboardAMobile.style.display = "flex";
      } else if (window.innerWidth > 768) {
        dashboardAMobile.style.display = "none";
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    if (searchParams.get("message") === "invalid_request") {
      notifyError();
      window.history.replaceState({}, document.title, "/");

      return;
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
  const getAds = () => {
    const ads = [
      {
        id: 1,
        title: "Ad 1",
        description: "Ad 1 description",
        image: "https://via.placeholder.com/300x250",
        url: "https://www.google.com",
      },
    ];
    return ads;
  };
  return (
    <>
      <Snowfall
        // The color of the snowflake, can be any valid CSS color.
        color="#fff"
        // Applied to the canvas element.
        style={{ background: "transparent" }}
        // Controls the number of snowflakes that are created (defaults to 150).
        snowflakeCount={100}
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
              <a
                id="dashboardSection"
                href={!session ? "/login" : "/dashboard"}
              >
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
                  <a
                    id="loginSection"
                    style={{ cursor: "pointer" }}
                    onClick={goToLogin}
                  >
                    Log-in
                  </a>
                </>
              ) : (
                <>
                  <a
                    id="loginSection"
                    style={{ cursor: "pointer" }}
                    onClick={() => menu()}
                  >
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
          <Tippy content="Insert Link here" placement="bottom">
            <input
              itemType="url"
              ref={focused}
              onChange={(text) => setText(text.target.value)}
              type="text"
              placeholder="Paste your link here"
              id="input"
            ></input>
          </Tippy>
          <a id="button" onClick={loadURL}>
            <ButtonShort text={text} buttonRef={refButton} />
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
        <img src="logo-center.svg" />
      </div>
      {/* <Ad /> */}

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
              Made with{" "}
              <Heart
                color="#FBBD12"
                style={{ position: "relative", top: "2px" }}
              />{" "}
              by{" "}
              <a
                target={"_blank"}
                href="https://github.com/ALGxMily"
                style={{ color: "#fff", textDecoration: "none" }}
              >
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
      <p>
        Our API is free to use and easy to integrate. You can use it to shorten
        links, get analytics, and more.
      </p>
    </div>
  );
}
export default App;
