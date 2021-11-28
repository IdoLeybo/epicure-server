import React, { useState } from "react";
import EditForm from "../../Modal/EditModals/EditForm";

export default function Chef(props: any) {
  const details = props.details;
  const [isModal, setIsModal] = useState(false);

  const openForm = () => {
    setIsModal(!isModal);
  };

  return (
    <>
      <div className="item-button" onClick={openForm}>
        <h3>{details.chefName}</h3>
        <img src={details.image} alt="" />
      </div>
      {isModal && (
        <EditForm modalType={"chef"} openForm={openForm} details={details} />
      )}
    </>
  );
}
