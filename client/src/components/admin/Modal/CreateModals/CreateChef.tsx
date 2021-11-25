import React, { useState } from "react";
import { URI } from "../../AdminSystem";

import "../style.scss";

export default function CreateChef() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const admin = JSON.parse(localStorage.getItem("admin") as any);

  const createChef = () => {
    const data = {
      chefName: name,
      description: description,
      image: image,
    };
    createFetch(data);
  };

  const createFetch = (data: object) => {
    fetch(`${URI}/api/chefs/new`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${admin.token}`,
      },
      body: JSON.stringify(data),
    })
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
      <h1>Create new chef</h1>
      <label>Chef Name:</label>
      <input
        type="text"
        placeholder="Enter chef name"
        onChange={(event) => setName(event.target.value)}
      />
      <label>Description:</label>
      <input
        type="text"
        placeholder="Details on the chef"
        onChange={(event) => setDescription(event.target.value)}
      />
      <label>Image url:</label>
      <input
        type="text"
        placeholder="Enter image URL"
        onChange={(event) => {
          setImage(event.target.value);
        }}
      />

      <button onClick={() => createChef()}>Create New Chef</button>
    </form>
  );
}
