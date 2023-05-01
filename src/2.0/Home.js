import React, { useEffect } from "react";
import "./Home2.css";
import Lottie from "lottie-react";
import loadingAnimation from "../lottie/Link.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  LinkOutline,
  QrCodeOutline,
  Pencil,
  ShapesOutline,
  ShareOutline,
  CopyOutline,
  CloseOutline,
  Close,
} from "react-ionicons";
import { useNavigate } from "react-router-dom";
import db from "./firebase";
import {
  addDoc,
  collection,
  doc,
  documentId,
  setDoc,
} from "firebase/firestore";

export default function Home() {
  const [loading, setLoading] = React.useState(false);
  const [urlReady, setUrlReady] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [urlId, setUrlId] = React.useState("");
  const [mobile, isMobile] = React.useState(true);
  const navigate = useNavigate();
  const copy = () => {
    // navigator.clipboard.writeText(url); doesn't work on mobile workaround
    const el = document.createElement("textarea");
    el.value = urlId;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    toast.success("Copied to clipboard!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      closeButton: false,
      progress: undefined,
      style: { backgroundColor: "#1e1e1e", color: "#ffffff", height: "40%" },
    });
  };

  const generateURL = () => {
    setLoading(true);
    // get items in clipboard workaround for http
    navigator.clipboard.readText().then((text) => {
      if (text.includes("http")) {
        setUrl(text);
        setUrlReady(true);
        createURL(text);
        setLoading(false);
      } else {
        toast.error("Invalid URL!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          closeButton: false,
          progress: undefined,
          style: {
            backgroundColor: "#1e1e1e",
            color: "#ffffff",
            height: "40%",
          },
        });
        setLoading(false);
      }
    });
  };

  const close = () => {
    setUrlReady(false);
    setUrl("");
  };

  const createURL = (urlRequested) => {
    setLoading(true);
    const id = Math.random().toString(36).substring(2).substring(0, 5);
    // create a collection called urls and name the document the id and add the url into the document using doc and collection
    setDoc(doc(db, "urls", id), { url: urlRequested })
      .catch((err) => {
        toast.error("Error creating URL!", { position: "bottom-right" });
        setLoading(false);
      })
      .finally(() => {
        setUrlId("https://kutturl.com/" + id);
        setLoading(false);
        setUrlReady(true);
      });
  };

  useEffect(() => {
    // if user presses ctrl + v keys
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.key === "v") {
        generateURL();
      }
      // if return key is pressed on mobile
      if (event.key === "Enter") {
        generateURL();
      }
      if (event.key === "Escape") {
        close();
      }
      if (event.ctrlKey && event.key === "c") {
        copy();
      }
    };
    // check if user is on mobile or desktop
    const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (mobile) {
      // if user is on mobile
      isMobile(true);
    } else {
      // if user is on desktop
      isMobile(false);
    }
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);
  }, [url]);

  useEffect(() => {
    if (isMobile) {
      toast.info("Press ctrl + v to generate a URL!", {
        position: "bottom-center",
        autoClose: url ? 1000 : 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton: false,
        progress: undefined,
        style: { backgroundColor: "#1e1e1e", color: "#ffffff", height: "40%" },
      });
    } else {
      toast.info("Tap and paste to generate a URL!", {
        position: "bottom-center",
        autoClose: url ? 1000 : 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton: false,
        progress: undefined,
        style: { backgroundColor: "#1e1e1e", color: "#ffffff", height: "40%" },
      });
    }
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className="header">
          <nav aria-disabled="true">
            <ul>
              <li
                style={{ marginRight: "auto" }}
                onClick={() => {
                  toast.info("Coming soon!", {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    closeButton: false,
                    progress: undefined,
                    style: {
                      backgroundColor: "#1e1e1e",
                      color: "#ffffff",
                      height: "40%",
                    },
                  });
                }}
              >
                <a href="#">Login</a>
              </li>
              <li
                onClick={() => {
                  toast.info("Coming soon!", {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    closeButton: false,
                    progress: undefined,
                    style: {
                      backgroundColor: "#1e1e1e",
                      color: "#ffffff",
                      height: "40%",
                    },
                  });
                }}
              >
                <a href="#">Sign Up</a>
              </li>
            </ul>
          </nav>
        </div>
        {!loading && (
          <>
            <img src="logo-center-old.svg" alt="logo" className="logo" />
            <input
              disabled={urlReady}
              style={{
                backgroundColor: urlReady ? "#1e1e1e" : "#2c2c2c",
                color: urlReady ? "#fff" : "#1e1e1e",
                cursor: urlReady ? "not-allowed" : "text",
              }}
              type="text"
              placeholder="Paste your link here"
              onChange={(e) => setUrl(e.target.value)}
              value={
                url.length > 30
                  ? url.substring(0, isMobile ? 60 : 30) + "..."
                  : url
              }
            />
          </>
        )}
        {!loading && urlReady && (
          <>
            <div className="url-ready" onDoubleClick={copy}>
              <div className="url-ready__icon">
                <LinkOutline
                  color={"#ffffff"}
                  height="35px"
                  width="35px"
                  cssClasses={"url-ready__icon_link"}
                />

                <h3>{urlId}</h3>
              </div>

              <div className="url-ready__icon_extra">
                {/* <Pencil color={"#ffffff"} height="30px" width="30px" />
              <QrCodeOutline color={"#ffffff"} height="30px" width="30px" /> */}
                <CopyOutline
                  color={"#ffffff"}
                  height="30px"
                  width="30px"
                  onClick={copy}
                />
                <CloseOutline
                  color={"#ffffff"}
                  height="30px"
                  width="30px"
                  onClick={close}
                />
              </div>
              <div className="url-ready__icon_extra_mobile">
                <CopyOutline
                  color={"#ffffff"}
                  height="30px"
                  width="30px"
                  onClick={copy}
                />
                <CloseOutline
                  color={"#ffffff"}
                  height="30px"
                  width="30px"
                  onClick={copy}
                />
              </div>
            </div>
          </>
        )}
        <div className="footer">
          <h3>
            Made with <span style={{ color: "rgb(251, 189, 18)" }}>❤</span> by
            Dzhuliano Dimov
          </h3>
        </div>
        <ToastContainer />
        {loading && (
          <div>
            <Lottie
              animationData={loadingAnimation}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}
      </div>
    </>
  );
}
