import React from "react";
import Navbar from "./Navbar";
import { CSSTransition } from "react-transition-group";

export default function UserSystem(props: any) {
  const inProp = props.inProp;
  const setToken = props.setToken;
  return (
    <CSSTransition in={inProp} timeout={500} classNames="transition-1">
      <Navbar setToken={setToken} />
    </CSSTransition>
  );
}
