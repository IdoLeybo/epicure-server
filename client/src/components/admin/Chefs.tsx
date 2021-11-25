import React, { useState } from "react";
import Chef from "./Chef";
import { chef } from "../../interfaces/index.interface";
import CreateForm from "./Modal/CreateModals/CreateForm";

export default function Chefs(props: any) {
  const [isModal, setIsModal] = useState(false);
  const chefs = props.chefs;

  const openCreateForm = () => {
    setIsModal(!isModal);
  };

  return (
    <div>
      <h1>Chefs</h1>
      <button onClick={openCreateForm}>Add New Chef</button>
      {chefs.map((chef: chef) => {
        return <Chef key={chef.id} details={chef} />;
      })}
      {isModal && (
        <CreateForm openCreateForm={openCreateForm} modalType="chef" />
      )}
    </div>
  );
}
