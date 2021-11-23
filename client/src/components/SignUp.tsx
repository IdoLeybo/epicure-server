import { useRef, useState } from "react";
import "firebase/auth";
import "firebase/firestore";
import { auth, db } from "../App";

export default function SignUp({ setSignUp }: any) {
  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const addUser = (email: string, name: string) => {
    const userRef = db.collection("users").doc(auth.currentUser?.uid);
    userRef.set(
      {
        uid: auth.currentUser?.uid,
        name: name,
        email: email,
      },
      {
        merge: true,
      }
    );
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    name: string
  ): Promise<any> => {
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((result: any) => {
        const user = result.user;
      })
      .catch((e: Error) => console.log(e));
    addUser(email, name);
    setSignUp(false);
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form className="loggin-form">
        <label className="label-fields">
          Name:
          <input
            className="form-input"
            type="text"
            ref={nameRef}
            placeholder="Enter your name"
            required
          />
        </label>
        <label className="label-fields">
          Email:
          <input
            className="form-input"
            type="email"
            ref={emailRef}
            placeholder="Enter email"
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
          onClick={(e) => {
            e.preventDefault();
            signUpWithEmail(
              emailRef.current.value,
              passwordRef.current.value,
              nameRef.current.value
            );
          }}
        >
          Sign Up
        </button>
      </form>
    </>
  );
}
