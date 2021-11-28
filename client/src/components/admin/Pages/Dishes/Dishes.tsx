import React, { useState } from "react";
import Dish from "./Dish";
import { dish } from "../../../../interfaces/index.interface";
import CreateForm from "../../Modal/CreateModals/CreateForm";

export default function Dishes(props: any) {
  const [isModal, setIsModal] = useState(false);

  const dishes = props.dishes;
  const restaurants = props.restaurants;

  const openCreateForm = () => {
    setIsModal(!isModal);
  };
  return (
    <div className="main-div">
      <div className="header">
        <h1>Dishes</h1>
        <span className="add-new" onClick={openCreateForm}>
          +
        </span>
      </div>

      <div className="d-flex items-div">
        {dishes.map((dish: dish, index: any) => {
          return <Dish key={index} details={dish} restaurants={restaurants} />;
        })}
      </div>
      {isModal && (
        <CreateForm
          openCreateForm={openCreateForm}
          restaurants={restaurants}
          modalType="dish"
        />
      )}
    </div>
  );
}
