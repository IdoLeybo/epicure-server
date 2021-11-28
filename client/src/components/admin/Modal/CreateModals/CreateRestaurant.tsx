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
    <form className="edit-modal-container">
      <h1>Create New Restaurant</h1>
      <label className="label">Restaurant Name:</label>
      <input
        className="input"
        type="text"
        placeholder="Enter restaurant name"
        onChange={(event) => setName(event.target.value)}
      />
      <label className="label">Image url:</label>
      <input
        className="input"
        type="text"
        placeholder="Enter image URL"
        onChange={(event) => {
          setImage(event.target.value);
        }}
      />
      {image ? (
        <img className="item-img" src={image} alt="" />
      ) : (
        <img
          className="dish-img"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY19XSM-mykA4B-o66_us7Vl2l1dpyXm5j1Q&usqp=CAU"
          alt=""
        />
      )}
      <label className="label">Select chef:</label>
      <select
        className="input"
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
      <button className="update-btn" onClick={createRestaurant}>
        Create
      </button>
    </form>
  );
}
