import React from "react";
import { BrowserRouter, NavLink, Switch, Route, Link } from "react-router-dom";
import styles from "../../assets/styles/components/navbar.module.scss";
import userIcon from "../../assets/images/icons/user-icon.svg";
import firebase from "firebase";
import "firebase/auth";
import Restaurants from "./Restaurants";
import Chefs from "./Chefs";
import Dishes from "./Dishes";

export default function Header(props: any) {
  const restaurants = props.restaurants;
  const chefs = props.chefs;
  const dishes = props.dishes;

  const signOut = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <BrowserRouter>
      <nav className="d-flex menu-container">
        <NavLink to="/api/restaurants">Restaurants</NavLink>
        <NavLink to="/api/chefs">Chefs</NavLink>
        <NavLink to="/api/dishes">Dishes</NavLink>
        <NavLink to="/signIn">
          <button className={styles["nav-icon"]} onClick={signOut}>
            <img src={userIcon} alt="user" />
          </button>
        </NavLink>
      </nav>
      <Switch>
        <Route path="/api/restaurants">
          <Restaurants restaurants={restaurants} />
        </Route>
        <Route path="/api/chefs">
          <Chefs chefs={chefs} />
        </Route>
        <Route path="/api/dishes">
          <Dishes dishes={dishes} />
        </Route>
      </Switch>
    </BrowserRouter>
  );

  // return (
  //   <nav className="d-flex">
  //     <div className="menu-container d-flex">
  //       <div className={styles["hamburger-wrapper"]}>
  //         <button
  //           className={styles["hamburger hamburger--collapse"]}
  //           type="button"
  //         >
  //           <span className={styles["hamburger-box"]}>
  //             <span className={styles["hamburger-inner"]}></span>
  //           </span>
  //         </button>
  //       </div>
  //       <ul className={styles["nav-list"] + " d-flex flex-row"}>
  //         <li>
  //           <a href="/api/restaurants">Restaurants</a>
  //         </li>
  //         <li>
  //           <a href="/api/chefs">Chefs</a>
  //         </li>
  //         <li>
  //           <a href="#">Dishes</a>
  //         </li>
  //       </ul>
  //       <div className={styles["buttons-wrapper"]}>
  //         <button className={styles["nav-icon"]} onClick={signOut}>
  //           <img src={userIcon} alt="user" />
  //         </button>
  //       </div>
  //     </div>
  //   </nav>
  // );
}
