import { useRef, useState } from "react";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import SignUp from "./SignUp";
import { auth, db } from "../App";

export default function SignIn() {
  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [signUp, setSignUp] = useState<boolean>(false);

  // Functions
  const signInWithEmail = async (email: string, password: string) => {
    await auth
      .signInWithEmailAndPassword(email, password)
      .catch((e: Error) => console.log(e.message));
  };

  const goToSignUp = () => {
    setSignUp(true);
  };

  return (
    <>
      <div>
        {signUp ? (
          <SignUp setSignUp={setSignUp} />
        ) : (
          <>
            <h1>Sign In</h1>
            <form
              className="loggin-form"
              onSubmit={(e) => {
                e.preventDefault();
                signInWithEmail(
                  emailRef.current.value,
                  passwordRef.current.value
                );
              }}
            >
              <label className="label-fields">
                Email:
                <input className="form-input" type="email" ref={emailRef} />
              </label>

              <label className="label-fields">
                Password:
                <input
                  className="form-input"
                  type="password"
                  ref={passwordRef}
                />
              </label>
              <button className="loggin-btn" type="submit">
                Log In
              </button>
              <button onClick={goToSignUp}>Sign Up</button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
