import React, { useState } from "react";
import EditForm from "../../Modal/EditModals/EditForm";

export default function Dish(props: any) {
  const [isModal, setIsModal] = useState(false);

  const details = props.details;
  const restaurants = props.restaurants;

  const openForm = () => {
    setIsModal(!isModal);
  };
  return (
    <>
      <div className="item-button" onClick={openForm}>
        <h3>{details.name}</h3>
        <img src={details.image} alt="" />
      </div>
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
