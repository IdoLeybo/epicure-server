import React, { useState } from "react";
import Dishes from "../Dishes/Dishes";
import EditForm from "../../Modal/EditModals/EditForm";

export default function Restaurant(props: any) {
  const [isModal, setIsModal] = useState(false);

  const details = props.details;

  const openForm = () => {
    setIsModal(!isModal);
  };
  return (
    <>
      <div className="item-button" onClick={() => openForm()}>
        <h3>{details.name}</h3>
        <img src={details.image} alt="" />
      </div>
      {isModal && (
        <EditForm
          modalType={"restaurant"}
          openForm={openForm}
          details={details}
        />
      )}
    </>
  );
}
