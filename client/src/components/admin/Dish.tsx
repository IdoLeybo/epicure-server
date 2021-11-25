import React, { useState } from "react";
import EditForm from "./Modal/EditForm";

export default function Dish(props: any) {
  const [isModal, setIsModal] = useState(false);

  const details = props.details;
  const restaurants = props.restaurants;

  const openForm = () => {
    setIsModal(!isModal);
  };
  return (
    <>
      <button onClick={() => openForm()}>
        <h3>{details.name}</h3>
        <img width="40px" height="40px" src={details.image} alt="" />
      </button>
      {isModal && (
        <EditForm
          modalType={"dish"}
          openForm={openForm}
          details={details}
          restaurants={restaurants}
        />
      )}
    </>
  );
}
