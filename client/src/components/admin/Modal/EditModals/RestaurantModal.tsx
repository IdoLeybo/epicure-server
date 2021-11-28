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
    const type = "update";
    updateFetch(id, data, type);
  };

  const deleteRestaurant = (id: string) => {
    const data = {
      valid: false,
    };
    const type = "delete";
    updateFetch(id, data, type);
  };

  const updateFetch = (id: string, data: object, type: string) => {
    fetch(`${URI}/api/restaurants/${type}/${id}`, {
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
    <form className="edit-modal-container">
      <h1>Edit restaurant details</h1>
      <label className="label">Restaurnt Name:</label>
      <input
        className="input"
        type="text"
        value={name}
        placeholder={details.name}
        onChange={(event) => setName(event.target.value)}
      />
      <label className="label">Image url:</label>
      <input
        className="input"
        type="text"
        value={image}
        placeholder={details.image}
        onChange={(event) => {
          setImage(event.target.value);
        }}
      />

      <img className="item-img" src={image} />
      <div className="buttons-div">
        <button
          className="delete-btn"
          onClick={() => deleteRestaurant(details._id)}
        >
          Delete Restaurant
        </button>
        <button
          className="update-btn"
          onClick={() => updateRestaurant(details._id)}
        >
          Update
        </button>
      </div>
    </form>
  );
}
