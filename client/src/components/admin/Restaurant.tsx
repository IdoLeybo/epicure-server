import React, { useState } from "react";
import Dishes from "./Dishes";
import EditForm from "./Modal/EditModals/EditForm";

export default function Restaurant(props: any) {
  const [isModal, setIsModal] = useState(false);

  const details = props.details;

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
          modalType={"restaurant"}
          openForm={openForm}
          details={details}
        />
      )}
    </>
  );
}
