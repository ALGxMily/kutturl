import React from "react";
import { auth } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { ToastContainer, toast } from "react-toastify";
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
          <img src="logo-center.svg" />
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

              <button
                onClick={(e) => register(e)}
                type="submit"
                className="registerButton"
              >
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
