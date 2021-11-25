import React from "react";
import { BrowserRouter, NavLink, Switch, Route, Link } from "react-router-dom";
import styles from "../../assets/styles/components/navbar.module.scss";
import userIcon from "../../assets/images/icons/user-icon.svg";
import Restaurants from "./Restaurants";
import Chefs from "./Chefs";
import Dishes from "./Dishes";
import SignIn from "../welcome/SignIn";

export default function Header(props: any) {
  const restaurants = props.restaurants;
  const chefs = props.chefs;
  const dishes = props.dishes;
  const setAdmin = props.setAdmin;

  const logout = () => {
    localStorage.clear();
    setAdmin("");
  };

  return (
    <BrowserRouter>
      <nav className="d-flex menu-container">
        <Link to="/">Restaurants</Link>
        <Link to="/api/chefs">Chefs</Link>
        <Link to="/api/dishes">Dishes</Link>
        <Link to="/welcome" onClick={logout}>
          <img src={userIcon} alt="user" />
        </Link>
      </nav>
      <Switch>
        <Route path="/api/chefs">
          <Chefs chefs={chefs} />
        </Route>
        <Route path="/api/dishes">
          <Dishes dishes={dishes} restaurants={restaurants} />
        </Route>
        <Route path="/">
          <Restaurants restaurants={restaurants} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
