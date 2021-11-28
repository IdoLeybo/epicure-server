import React from "react";
import { BrowserRouter, Switch, Route, Link, NavLink } from "react-router-dom";
import userIcon from "../../../assets/images/icons/user-icon.svg";
import Restaurants from "../Pages/Restaurants/Restaurants";
import Chefs from "../Pages/Chefs/Chefs";
import Dishes from "../Pages/Dishes/Dishes";
import "./AdminNav.scss";

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
      <nav className="d-flex ">
        <div className="d-flex menu-container head-nav">
          <div className="nav-item">
            <NavLink
              to="/restaurants"
              activeStyle={{ borderBottom: "1px solid orange" }}
            >
              Restaurants
            </NavLink>
          </div>
          <div className="nav-item">
            <NavLink
              to="/chefs"
              activeStyle={{ borderBottom: "1px solid orange" }}
            >
              Chefs
            </NavLink>
          </div>
          <div className="nav-item">
            <NavLink
              to="/dishes"
              activeStyle={{ borderBottom: "1px solid orange" }}
            >
              Dishes
            </NavLink>
          </div>
          <div className="nav-item">
            <Link to="/welcome" onClick={logout}>
              <img src={userIcon} alt="user" />
            </Link>
          </div>
        </div>
      </nav>
      <Switch>
        <Route path="/chefs">
          <Chefs chefs={chefs} />
        </Route>
        <Route path="/dishes">
          <Dishes dishes={dishes} restaurants={restaurants} />
        </Route>
        <Route path="/restaurants">
          <Restaurants restaurants={restaurants} chefs={chefs} />
        </Route>
        <Route path="/">
          <Restaurants restaurants={restaurants} chefs={chefs} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
