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
} from "react-router-dom";
import Login from "./Login";
import { MdContentPaste } from "react-icons/md";
import Register from "./Register";
import { supabase } from "./supabaseClient";
import Dashboard from "./Dashboard";
import Lottie from "lottie-react";

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
  const logout = async () => {
    await supabase.auth.signOut();
    navigateTo("/login");
  };
  const userLogin = async () => {
    console.log("login");
    supabase.auth.getSession().then((session) => {
      console.log(session);
      if (session.data.session === null) {
        setSession(false);
        setLoading(false);
      } else {
        setLoading(false);
        setSession(true);
        getUser(session.data.session.user.id);
      }
    });
  };
  const getUser = async (id) => {
    const userID = id;
    const { data, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", userID)
      .single();
    if (data) {
      console.log(data);
      setUsername(data.username);
      setLoading(false);
      setSession(true);
    }
  };

  const [text, setText] = React.useState("");
  const focused = React.useRef(null);
  const refButton = React.useRef(null);
  const handleKeyPress = React.useCallback((event) => {
    // check if the Shift key is pressed
    if (event.ctrlKey === true && event.key === "v") {
      // do something
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
        });
    }
  }, []);
  React.useEffect(() => {
    userLogin();
  }, []);
  React.useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
  return (
    <>
      <div className="App">
        <div className="App-header" id="logoHeader">
          <img src="logo-center.svg" />
          <div className="inputWrap" id="header">
            <li>
              <a href="/urls">My URLs</a>
            </li>
            <li>
              {!session ? (
                <a href="/login">Log-in</a>
              ) : (
                <>
                  <a href="/dashboard">{username} </a>
                  <a id="logout" className="logout" onClick={logout}>
                    Log-out
                  </a>
                </>
              )}
            </li>
          </div>
        </div>
      </div>
      <div className="contentWrap" id="container">
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
          <ButtonShort text={text} buttonRef={refButton} />
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
    </>
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
