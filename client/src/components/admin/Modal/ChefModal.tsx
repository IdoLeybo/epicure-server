import React, { useState } from "react";
import axios from "axios";
import { URI } from "../Main";

export default function ChefModal(props: any) {
  const details = props.details;
  const [name, setName] = useState(details.chefName);
  const [image, setImage] = useState(details.image);
  const [description, setDescription] = useState(details.description);

  const updateChef = (id: string) => {
    const data = {
      chefName: name,
      description: description,
      image: image,
    };
    axios.put(`${URI}/api/chefs/update/${id}`, data).catch((err) => {
      throw err;
    });
  };

  return (
    <form
      className="edit-modal-container"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h1>Edit chef details</h1>
      <label>Chef Name:</label>
      <input
        type="text"
        value={name}
        placeholder={details.chefName}
        onChange={(event) => setName(event.target.value)}
      />
      <label>Description:</label>
      <input
        type="text"
        value={description}
        placeholder={details.description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <label>Image url:</label>
      <input
        type="text"
        value={image}
        placeholder={details.image}
        onChange={(event) => {
          setImage(event.target.value);
        }}
      />

      <button onClick={() => updateChef(details._id)}>Update</button>
    </form>
  );
}
