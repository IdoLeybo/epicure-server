import React, { useState } from "react";
import EditForm from "./Modal/EditForm";

export default function Chef(props: any) {
  const details = props.details;
  const [isModal, setIsModal] = useState(false);

  const openForm = () => {
    setIsModal(!isModal);
  };

  return (
    <>
      <button onClick={() => openForm()}>
        <h3>{details.chefName}</h3>
        <img width="40px" height="40px" src={details.image} alt="" />
      </button>
      {isModal && (
        <EditForm modalType={"chef"} openForm={openForm} details={details} />
      )}
    </>
  );
}
