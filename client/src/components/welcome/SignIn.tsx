import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
export const URI = process.env.URI || "http://localhost:8080";

export default function SignIn(props: any) {
  const usernameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const setIsSignUp = props.setIsSignUp;

  const setAdmin = props.setAdmin;
  const setToken = props.setToken;
  let history = useHistory();

  const loginUser = async () => {
    if (usernameRef.current.value === "" || passwordRef.current.value === "")
      return alert("Must fill all fields");
    try {
      const res = await fetch(`${URI}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        }),
      });
      const data = await res.json();
      if (data.error) return;
      if (data.user.admin) {
        localStorage.setItem(
          "admin",
          JSON.stringify({ token: data.accessToken })
        );
        setAdmin(data.user);
        history.push("/restaurants");
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify({ token: data.accessToken })
        );
        setToken(data.user);
        history.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="form">
        <h3>Sign In</h3>
        <label className="form-label">
          Username:
          <input
            className="form-input"
            type="text"
            ref={usernameRef}
            placeholder="Enter Username"
          />
        </label>
        <label className="form-label">
          Password:
          <input
            className="form-input"
            type="password"
            ref={passwordRef}
            placeholder="Enter Password"
          />
        </label>
        <button className="form-btn" onClick={loginUser}>
          Log In
        </button>
        <span className="form-span">
          You don't have account?{" "}
          <a onClick={() => setIsSignUp(true)}>Sign Up</a>
        </span>
      </div>
    </div>
  );
}
