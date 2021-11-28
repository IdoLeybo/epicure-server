import React, { useState } from "react";
import { URI } from "../../AdminSystem";

export default function ChefModal(props: any) {
  const details = props.details;
  const [name, setName] = useState(details.chefName);
  const [image, setImage] = useState(details.image);
  const [description, setDescription] = useState(details.description);
  const admin = JSON.parse(localStorage.getItem("admin") as any);

  const updateChef = (id: string) => {
    const data = {
      chefName: name,
      description: description,
      image: image,
    };
    const type = "update";
    updateFetch(id, data, type);
  };

  const deleteChef = (id: string) => {
    const data = {
      valid: false,
    };
    const type = "delete";
    updateFetch(id, data, type);
  };

  const updateFetch = (id: string, data: object, type: string) => {
    fetch(`${URI}/api/chefs/${type}/${id}`, {
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
      <h1>Edit chef details</h1>
      <label className="label">Chef Name:</label>
      <input
        className="input"
        type="text"
        value={name}
        placeholder={details.chefName}
        onChange={(event) => setName(event.target.value)}
      />
      <label className="label">Description:</label>
      <input
        className="input"
        type="text"
        value={description}
        placeholder={details.description}
        onChange={(event) => setDescription(event.target.value)}
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
        <button className="delete-btn" onClick={() => deleteChef(details._id)}>
          Delete Chef
        </button>
        <button className="update-btn" onClick={() => updateChef(details._id)}>
          Update
        </button>
      </div>
    </form>
  );
}
