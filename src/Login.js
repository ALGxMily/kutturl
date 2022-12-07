import React from "react";
import "./App.css";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";

import "firebase/compat/auth";
import { auth } from "./firebaseConfig";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorData, setError] = React.useState("");
  const loadingRef = React.useRef(null);
  const navigateTo = useNavigate();

  //change button height when keyboard is up
  React.useEffect(() => {
    document.title = "Kutturl | Login";
    const keyboardUp = () => {
      const button = document.querySelector(".form-group button");
      const input = document.querySelector(".form-group input");
      button.style.height = "60vh";
      input.style.height = "60%";
      console.log("keyboard up");
    };
    const keyboardDown = () => {
      const button = document.getElementById(".form-group button");
      const input = document.querySelector(".form-group input");
      button.style.height = "20vh";
      input.style.height = "20%";
      console.log("keyboard down");
    };
    window.addEventListener("keyboardDidShow", keyboardUp);
    window.addEventListener("keyboardDidHide", keyboardDown);
    return () => {
      window.removeEventListener("keyboardDidShow", keyboardUp);
      window.removeEventListener("keyboardDidHide", keyboardDown);
    };
  }, []);
  const notifyErrorGlobal = (error) => {
    try {
      toast.error(`Error- ${error}`, {
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
  const login = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      auth
        .signInWithEmailAndPassword(email, password)
        .catch((error) => {
          if (error) setLoading(false);
          const errorTemp = error.message;
          setError(errorTemp);
          navigateTo("/login");
          //rerender the page and show error
          errorData === "INVALID_EMAIL" || "EMAIL_NOT_FOUND" || "INVALID_PASSWORD" || "USER_DISABLED"
            ? notifyErrorGlobal("Invalid Email or Password")
            : notifyErrorGlobal("Something went wrong");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .finally(() => {
          setLoading(false);
        })
        .then((response) => {
          if (!response) {
            console.log(response.error);
            setLoading(false);
            return;
            // window.location.reload();
          }
          if (response.user !== null) {
            setLoading(false);
            notifySuccessful("Login Successful");
            navigateTo("/dashboard");
          }
        });
      // } catch (error) {
      //   console.log(error);
      //   setLoading(false);
      //   error.message === "INVALID_EMAIL" ||
      //   "EMAIL_NOT_FOUND" ||
      //   "INVALID_PASSWORD" ||
      //   "USER_DISABLED"
      //     ? notifyErrorGlobal("Invalid Email or Password")
      //     : notifyErrorGlobal("Something went wrong");
      //   notifyErrorGlobal(error.message);
      //   setLoading(true);
      //   navigateTo("/login");
      // }
      // };
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const goToHome = () => {
    navigateTo("/", { state: { message: "Logged in successfully" } });
  };
  React.useEffect(() => {
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
      <div className="split" id="screen">
        <div className="left" id="left">
          <object
            id="logo-auth"
            style={{ cursor: "pointer" }}
            onClick={goToHome}
            draggable={false}
            data={"logo-center.svg"}
          />
        </div>
        <div className="right">
          <form>
            <div className="form-group" id="form">
              <label htmlFor="email" id="emailLabel">
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
              <label htmlFor="password" id="passwordLabel">
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

              <button onClick={(e) => login(e)} className="btn btn-primary">
                <p>Login</p>
              </button>
              <small>
                New here?{" "}
                <a
                  onClick={() => {
                    window.location.href = "/register";
                  }}
                >
                  Make a new account today
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
