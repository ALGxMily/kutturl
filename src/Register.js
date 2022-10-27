import React from "react";
import { supabase } from "./supabaseClient";

export default function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [error, setError] = React.useState("");
  const login = async (e) => {
    e.preventDefault();
    try {
      const { user, session, error } = await supabase.auth
        .signUp(
          {
            email: email,
            password: password,
          },
          {
            data: {
              username,
            },
          }
        )
        .catch((error) => {
          console.log(error);
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.user.aud === "authenticated") {
            window.location.href = "/";
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="split">
      <div className="left">
        <img src="logo-center.svg" />
      </div>
      <div className="right">
        <form>
          <div className="form-group">
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
              onClick={(e) => login(e)}
              type="submit"
              className="registerButton"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
