import React, { useState } from "react";
import ChefModal from "./ChefModal";
import RestaurantModal from "./RestaurantModal";
import DishModal from "./DishModal";
import "./style.scss";

export default function EditForm(props: any) {
  const openForm = () => props.openForm();
  const details = props.details;
  const modalType = props.modalType;
  const restaurants = props.restaurants;

  return (
    <div>
      <div className="modal-backgroud" onClick={() => openForm()}></div>
      {modalType === "restaurant" ? (
        <RestaurantModal details={details} />
      ) : modalType === "chef" ? (
        <ChefModal details={details} />
      ) : (
        modalType === "dish" && (
          <DishModal details={details} restaurants={restaurants} />
        )
      )}
    </div>
  );
}
