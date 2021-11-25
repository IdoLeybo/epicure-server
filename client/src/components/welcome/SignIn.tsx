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
        history.push("/");
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
      <h1>Sign In</h1>
      <div>
        <label>
          Username:
          <input type="text" ref={usernameRef} />
        </label>
        <label>
          Password:
          <input type="password" ref={passwordRef} />
        </label>
        <button onClick={loginUser}>Log In</button>
        <button onClick={() => setIsSignUp(true)}>Sign Up</button>
      </div>
    </div>
  );
}
