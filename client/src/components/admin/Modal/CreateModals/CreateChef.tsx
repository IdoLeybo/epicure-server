import React, { useState } from "react";
import { URI } from "../../AdminSystem";

export default function CreateChef() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLIbLTGKz4waJGU2vkbhQkRavjf2OdeY7Eo4l8yFnggdF3fX1bUF4FEUP13o34ioSCm-M&usqp=CAU"
  );
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
    <form className="edit-modal-container">
      <h1>Create new chef</h1>
      <label className="label">Chef Name:</label>
      <input
        className="input"
        type="text"
        placeholder="Enter chef name"
        onChange={(event) => setName(event.target.value)}
      />
      <label className="label">Description:</label>
      <input
        className="input"
        type="text"
        placeholder="Details on the chef"
        onChange={(event) => setDescription(event.target.value)}
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
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLIbLTGKz4waJGU2vkbhQkRavjf2OdeY7Eo4l8yFnggdF3fX1bUF4FEUP13o34ioSCm-M&usqp=CAU"
          alt=""
        />
      )}

      <button className="update-btn" onClick={() => createChef()}>
        Create
      </button>
    </form>
  );
}
