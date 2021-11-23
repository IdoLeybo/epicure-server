import React, { useState } from "react";
import axios from "axios";
import { URI } from "../Main";

export default function RestaurantModal(props: any) {
  const details = props.details;
  const [name, setName] = useState(details.name);
  const [chef, setChef] = useState(details.chef);
  const [image, setImage] = useState(details.image);

  const updateRestaurant = (id: string) => {
    const data = {
      name: name,
      chef: chef,
      image: image,
    };
    axios.put(`${URI}/api/restaurants/update/${id}`, data).catch((err) => {
      throw err;
    });
  };

  return (
    <form
      className="edit-modal-container"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h1>Edit restaurant details</h1>
      <label>Restaurnt Name:</label>
      <input
        type="text"
        value={name}
        placeholder={details.name}
        onChange={(event) => setName(event.target.value)}
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
      <label>Select chef:</label>
      <select
        value={chef}
        placeholder={details.chef}
        onChange={(event) => {
          setChef(event.target.value);
        }}
      >
        <option value={details.chef}>{details.chef}</option>
        <option value="chef name2">chef name2</option>
      </select>
      <button onClick={() => updateRestaurant(details._id)}>Update</button>
    </form>
  );
}
