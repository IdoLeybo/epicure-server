import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Welcome(props: any) {
  const [isSignUp, setIsSignUp] = useState(false);
  const setToken = props.setToken;
  const setAdmin = props.setAdmin;
  return (
    <div>
      {!isSignUp ? (
        <SignIn
          setToken={setToken}
          setAdmin={setAdmin}
          setIsSignUp={setIsSignUp}
        />
      ) : (
        <SignUp setIsSignUp={setIsSignUp} />
      )}
    </div>
  );
}
