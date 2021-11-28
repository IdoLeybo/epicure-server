import React, { useState } from "react";
import Restaurant from "./Restaurant";
import { restaurant } from "../../../../interfaces/index.interface";
import CreateForm from "../../Modal/CreateModals/CreateForm";
import "../Pages.scss";

export default function Restaurants(props: any) {
  const [isModal, setIsModal] = useState(false);
  const restaurants = props.restaurants;
  const chefs = props.chefs;

  const openCreateForm = () => {
    setIsModal(!isModal);
  };

  return (
    <div className="main-div">
      <div className="header">
        <h1>Restaurants</h1>
        <span className="add-new" onClick={openCreateForm}>
          +
        </span>
      </div>
      <div className="d-flex items-div">
        {restaurants.map((restaurant: restaurant) => {
          return <Restaurant key={restaurant.id} details={restaurant} />;
        })}
      </div>
      {isModal && (
        <CreateForm
          openCreateForm={openCreateForm}
          chefs={chefs}
          modalType="restaurant"
        />
      )}
    </div>
  );
}
