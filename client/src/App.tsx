import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Homepage from "./components/homepage/Homepage";
import { CSSTransition } from "react-transition-group";
import Aos from "aos";
import "aos/dist/aos.css";
import SignIn from "./components/SignIn";
import firebase from "firebase";
import "firebase/firestore";
import Main from "./components/admin/Main";

// Firebase configuration
firebase.initializeApp({
  apiKey: "AIzaSyC_LWUxIoStzlMPZk1K1FcsqWpOf-XfVvM",
  authDomain: "epicure-react.firebaseapp.com",
  projectId: "epicure-react",
  storageBucket: "epicure-react.appspot.com",
  messagingSenderId: "402966243212",
  appId: "1:402966243212:web:a431797dc14ae0665018a9",
});
export const auth = firebase.auth();
export const db = firebase.firestore();

function App() {
  const [inProp, setInProp] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        getUserData(userId);
      } else {
        setCurrentUser(false);
      }
    });
  }, []);

  useEffect(() => {
    setInProp(true);
    Aos.init({ duration: 500, delay: 50 });
  }, []);

  const getUserData = async (userId: string) => {
    const userData = db.collection("users").doc(userId);
    userData.get().then((doc) => {
      if (doc.exists) {
        const data: any = doc.data();
        if (data.isAdmin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        setCurrentUser(true);
      }
    });
  };
  return (
    <>
      {currentUser && isAdmin ? (
        <>
          <Main />
        </>
      ) : currentUser && !isAdmin ? (
        <>
          <CSSTransition in={inProp} timeout={500} classNames="transition-1">
            <Navbar />
          </CSSTransition>
          <main>
            <Homepage />
          </main>
        </>
      ) : (
        <SignIn />
      )}
    </>
  );
  // return (
  //   <>
  //     {currentUser && isAdmin ? (
  //       <>
  //         <Main />
  //       </>
  //     ) : currentUser && !isAdmin ? (
  //       <>
  //         <CSSTransition in={inProp} timeout={500} classNames="transition-1">
  //           <Navbar />
  //         </CSSTransition>
  //         <main>
  //           <Homepage />
  //         </main>
  //       </>
  //     ) : (
  //       <SignIn />
  //     )}
  //   </>
  // );
}

export default App;
