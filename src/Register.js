import React from "react";
import "./App.css";
import { auth } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { ToastContainer, toast } from "react-toastify";
import { colors } from "./App";
export default function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errorData, setError] = React.useState("");
  const loadingRef = React.useRef(null);
  const navigateTo = useNavigate();
  const notifyErrorGlobal = (error) => {
    try {
      toast.error(`Error ~ ${error}`, {
        position: "top-center",
        autoClose: 2000,
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
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll(".circle");

    circles.forEach(function (circle, index) {
      circle.x = 0;
      circle.y = 0;
      circle.style.backgroundColor = colors[index % colors.length];
    });

    window.addEventListener("mousemove", function (e) {
      coords.x = e.clientX;
      coords.y = e.clientY;
    });

    function animateCircles() {
      let x = coords.x;
      let y = coords.y;

      circles.forEach(function (circle, index) {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";

        circle.style.scale = (circles.length - index) / circles.length;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
      });

      requestAnimationFrame(animateCircles);
    }

    animateCircles();
  }, []);
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
  const register = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { user, session, error } = await auth
        .createUserWithEmailAndPassword(email, password)
        .catch((error, response) => {
          const err = error.toString();
          const isError =
            err ===
            "FirebaseError: Firebase: The email address is already in use by another account. (auth/email-already-in-use)."
              ? true
              : false;

          if (isError) {
            notifyErrorGlobal("Email already in use");
          } else {
            notifyErrorGlobal("Something went wrong");
          }
          setLoading(false);
          setTimeout(() => {
            window.location.reload();
          }, 2300);
        })
        .then(() => {
          setLoading(false);
          auth.currentUser
            .updateProfile({
              displayName: username,
            })
            .then(() => {
              setLoading(true);
              console.log(auth.currentUser.displayName);
            })
            .finally(() => {
              navigateTo("/");
              setLoading(false);
            });
        });
    } catch (error) {
      console.log("error", error);
    }
  };
  React.useEffect(() => {
    document.title = "Kutturl | Register";
    const split = document.getElementById("screen");
    const loadingLottie = document.getElementById("loading");
    const rightSide = document.getElementById("form");
    const leftSide = document.getElementById("left");
    if (loading) {
      loadingLottie.className = "loading";
      split.className = "split_loading";
      rightSide.className = "right_loading";
      leftSide.className = "left_loading";
    }
  }, [loading]);
  return (
    <>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="split" id="screen">
        <div className="left" id="left">
          <object data="logo-center-old.svg" />
        </div>
        <div className="right">
          <form>
            <div className="form-group" id="form">
              <label for="username" id="emailLabel">
                Username
              </label>
              <input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"
                className="form-control"
                id="UsernameForm"
                aria-describedby="emailHelp"
                placeholder="Enter username"
              />
              <label for="email" id="emailLabel">
                Email address
              </label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                className="form-control"
                id="emailForm"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <label for="password" id="passwordLabel">
                Password
              </label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="form-control"
                id="passwordForm"
                placeholder="Password"
              />

              <button onClick={(e) => register(e)} type="submit" className="registerButton">
                Create account
              </button>
              <small>
                Have an account already?{" "}
                <a
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                >
                  Login here
                </a>
              </small>
            </div>
          </form>
        </div>
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
