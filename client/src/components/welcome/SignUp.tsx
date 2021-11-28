import { useRef, useState } from "react";
export const URI = process.env.URI || "http://localhost:8080";

export default function SignUp(props: any) {
  const usernameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const setIsSignUp = props.setIsSignUp;

  const createUser = async () => {
    if (usernameRef.current.value === "" || passwordRef.current.value === "")
      return alert("Must fill all fields");
    try {
      const res = await fetch(`${URI}/api/users/register`, {
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
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div
        className="form"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h3>Sign Up</h3>
        <label className="form-label">
          Username:
          <input
            className="form-input"
            type="text"
            ref={usernameRef}
            placeholder="Enter Username"
            required
          />
        </label>

        <label className="form-label">
          Password:
          <input
            className="form-input"
            type="password"
            ref={passwordRef}
            placeholder="Enter Password"
            required
          />
        </label>
        <button className="form-btn" onClick={() => createUser()}>
          Sign Up
        </button>
        <span className="form-span">
          You already have an account?
          <a onClick={() => setIsSignUp(false)}> Sign In</a>
        </span>
      </div>
    </div>
  );
}
