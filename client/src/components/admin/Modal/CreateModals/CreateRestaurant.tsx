import React, { useState } from "react";
import { URI } from "../../AdminSystem";

export default function CreateRestaurant(props: any) {
  const chefs = props.chefs;
  const [name, setName] = useState("");
  const [chef, setChef] = useState(chefs[0]._id);
  const [image, setImage] = useState("");
  const admin = JSON.parse(localStorage.getItem("admin") as any);

  const createRestaurant = () => {
    const data = {
      name: name,
      chef: chef,
      image: image,
    };
    createFetch(data);
  };

  const createFetch = (data: object) => {
    fetch(`${URI}/api/restaurants/new`, {
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
      <h1>Create New Restaurant</h1>
      <label>Restaurant Name:</label>
      <input
        type="text"
        placeholder="Enter restaurant name"
        onChange={(event) => setName(event.target.value)}
      />
      <label>Image url:</label>
      <input
        type="text"
        placeholder="Enter image URL"
        onChange={(event) => {
          setImage(event.target.value);
        }}
      />
      {/* {image && <img src={image} width="200px" alt="" />} */}
      <label>Select chef:</label>
      <select
        onChange={(event) => {
          setChef(event.target.value);
        }}
      >
        {chefs.map((item: any, index: number) => {
          return (
            <option key={index} value={item._id}>
              {item.chefName}
            </option>
          );
        })}
      </select>
      <button onClick={createRestaurant}>Create New Restaurant</button>
    </form>
  );
}
