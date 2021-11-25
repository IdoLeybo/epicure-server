import React, { useState } from "react";
import { URI } from "../../AdminSystem";

export default function RestaurantModal(props: any) {
  const details = props.details;
  const [name, setName] = useState(details.name);
  const [chef, setChef] = useState(details.chef);
  const [image, setImage] = useState(details.image);
  const admin = JSON.parse(localStorage.getItem("admin") as any);

  const updateRestaurant = (id: string) => {
    const data = {
      name: name,
      chef: chef,
      image: image,
    };
    updateFetch(id, data);
  };

  const deleteRestaurant = (id: string) => {
    const data = {
      valid: false,
    };
    updateFetch(id, data);
  };

  const updateFetch = (id: string, data: object) => {
    fetch(`${URI}/api/restaurants/update/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${admin.token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((err) => {
        console.error("Error:", err);
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

      <img src={image} width="200px" />

      <button onClick={() => updateRestaurant(details._id)}>Update</button>
      <button onClick={() => deleteRestaurant(details._id)}>
        Delete Restaurant
      </button>
    </form>
  );
}
