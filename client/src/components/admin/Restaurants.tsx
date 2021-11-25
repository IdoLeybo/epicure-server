import React, { useState } from "react";
import Restaurant from "./Restaurant";
import { restaurant } from "../../interfaces/index.interface";
import CreateForm from "./Modal/CreateModals/CreateForm";

export default function Restaurants(props: any) {
  const [isModal, setIsModal] = useState(false);
  const restaurants = props.restaurants;
  const chefs = props.chefs;

  const openCreateForm = () => {
    setIsModal(!isModal);
  };

  return (
    <div>
      <h1>Restaurants</h1>
      <button onClick={openCreateForm}>Add New Restaurant</button>
      <div style={{ display: "flex", flexDirection: "row" }}>
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
