import React from "react";
import "../style.scss";
import CreateChef from "./CreateChef";
import CreateDish from "./CreateDish";
import CreateRestaurant from "./CreateRestaurant";

export default function CreateForm(props: any) {
  const openCreateForm = props.openCreateForm;
  const modalType = props.modalType;
  const restaurants = props.restaurants;
  const chefs = props.chefs;

  return (
    <div>
      <div className="modal-backgroud" onClick={() => openCreateForm()}></div>
      {modalType === "chef" ? (
        <CreateChef />
      ) : modalType === "restaurant" ? (
        <CreateRestaurant chefs={chefs} />
      ) : (
        modalType === "dish" && <CreateDish restaurants={restaurants} />
      )}
    </div>
  );
}
