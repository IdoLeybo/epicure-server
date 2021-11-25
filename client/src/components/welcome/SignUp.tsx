import { useRef, useState } from "react";
export const URI = process.env.URI || "http://localhost:8080";

export default function SignUp(props: any) {
  const usernameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const setIsSignUp = props.setIsSignUp;

  const createUser = async () => {
    if (usernameRef.current.value === "" || passwordRef.current.value === "")
      alert("Must fill all fields");
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
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form
        className="loggin-form"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label className="label-fields">
          userName:
          <input
            className="form-input"
            type="text"
            ref={usernameRef}
            placeholder="Enter Username"
            required
          />
        </label>

        <label className="label-fields">
          Password:
          <input
            className="form-input"
            type="password"
            ref={passwordRef}
            placeholder="Enter password"
            required
          />
        </label>
        <button
          className="loggin-btn"
          onClick={() => createUser()}
          style={{ width: "100px" }}
        >
          Sign Up
        </button>
        <a onClick={() => setIsSignUp(false)}>To Login page</a>
      </form>
    </>
  );
}
