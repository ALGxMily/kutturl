import React from "react";
import { auth } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
export default function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const loadingRef = React.useRef(null);
  const navigateTo = useNavigate();
  const register = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { user, session, error } = await auth
        .createUserWithEmailAndPassword(email, password)
        .catch((error) => {
          console.log(error);
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
      console.log(error);
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
              <label for="username">Username</label>
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
              <label for="email">Email address</label>
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
              <label for="password">Password</label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="form-control"
                id="passwordForm"
                placeholder="Password"
              />
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
              <button
                onClick={(e) => register(e)}
                type="submit"
                className="registerButton"
              >
                Create account
              </button>
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
    </>
  );
}
