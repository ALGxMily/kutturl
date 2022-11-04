import "./App.css";
import AnimatedBg from "react-animated-bg";
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
import Login from "./Login";
import { MdContentPaste } from "react-icons/md";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Lottie from "lottie-react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { auth } from "./firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signOut } from "firebase/auth";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/urls" element={<Urls />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/finalpage" element={<FinalPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
function Home() {
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
    }
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
    if (!text) {
      setLoading(false);
      notifyError();
      return;
    }
    setLoading(true);
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
  return (
    <>
      <div className="App">
        <div className="App-header" id="logoHeader">
          <img src="logo-center.svg" />
          {session ? (
            <a className="mobileUsername">Logged in as {username}</a>
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
              <a href={!session ? "/login" : "/dashboard"}>My URLs</a>
            </li>
            <li>
              {!session ? (
                <a style={{ cursor: "pointer" }} onClick={goToLogin}>
                  Log-in
                </a>
              ) : (
                <>
                  <a style={{ cursor: "pointer" }} onClick={() => menu()}>
                    {username}
                  </a>
                  {popUpMenu && PopUpMenu()}
                </>
              )}
            </li>
          </div>
          {session ? (
            <a className="mobileLogout" onClick={logout}>
              Logout
            </a>
          ) : null}
        </div>
      </div>
      <div className="contentWrapApp" id="container">
        <div className="content">
          <h2>Easy, convenient, prettier</h2>
          <p>Shorten your URLs like a boss.</p>
        </div>
        <div className="inputWrap">
          <input
            ref={focused}
            onChange={(text) => setText(text.target.value)}
            type="text"
            placeholder="Paste your link here"
          ></input>
          <a onClick={loadURL}>
            <ButtonShort text={text} buttonRef={refButton} />
          </a>
        </div>
      </div>
      <div id="logo">
        <img src="logo-center.svg" />
      </div>
      <footer>
        <div className="footerWrap">
          <div className="footerContent">
            {/* <img src='logo-center.svg'/> */}
          </div>
          <p>&copy; 2022 kuturl.xyz</p>
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
