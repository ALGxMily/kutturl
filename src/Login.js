import React from "react";
import "./App.css";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function Login() {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const loadingRef = React.useRef(null);
  const navigateTo = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth
        .signInWithPassword({
          email: email,
          password: password,
        })
        .catch((error) => {
          setError(error.error);
          setLoading(false);
        })
        .then((response) => {
          console.log(response);
          try {
            if (response.data.user.aud === "authenticated") {
              navigateTo("/");
            }
          } catch (error) {
            console.log(error);
          }
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
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
          <img draggable={false} src="logo-center.svg" />
        </div>
        <div className="right">
          <form>
            <div className="form-group" id="form">
              <label htmlFor="email">Email address</label>
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
              <label htmlFor="password">Password</label>
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
                New here?{" "}
                <a
                  onClick={() => {
                    window.location.href = "/register";
                  }}
                >
                  Make a new account today
                </a>
              </small>
              <button onClick={(e) => login(e)} className="btn btn-primary">
                Login
              </button>
              <small className="error">{error}</small>
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
