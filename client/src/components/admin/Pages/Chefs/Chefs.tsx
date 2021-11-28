import React, { useState } from "react";
import Chef from "./Chef";
import { chef } from "../../../../interfaces/index.interface";
import CreateForm from "../../Modal/CreateModals/CreateForm";

export default function Chefs(props: any) {
  const [isModal, setIsModal] = useState(false);
  const chefs = props.chefs;

  const openCreateForm = () => {
    setIsModal(!isModal);
  };

  return (
    <div className="main-div">
      <div className="header">
        <h1>Chefs</h1>
        <span className="add-new" onClick={openCreateForm}>
          +
        </span>
      </div>
      <div className="d-flex items-div">
        {chefs.map((chef: chef) => {
          return <Chef key={chef.id} details={chef} />;
        })}
      </div>
      {isModal && (
        <CreateForm openCreateForm={openCreateForm} modalType="chef" />
      )}
    </div>
  );
}
