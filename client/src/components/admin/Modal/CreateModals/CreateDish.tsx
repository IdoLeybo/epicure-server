import React, { useState } from "react";
import { URI } from "../../AdminSystem";

export default function CreateDish(props: any) {
  const restaurants = props.restaurants;
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [typeIcon, setTypeIcon] = useState();
  const [price, setPrice] = useState("0");
  const [restaurant, setRestaurant] = useState(restaurants[0]._id);
  const [veganType, setVeganType] = useState(false);
  const [spicyType, setSpicyType] = useState(false);
  const [vegetarianType, setVegetarianType] = useState(false);
  const admin = JSON.parse(localStorage.getItem("admin") as any);

  const createDish = () => {
    const data = {
      name: name,
      image: image,
      description: description,
      typeIcon: typeIcon,
      price: price,
      restaurant: restaurant,
    };
    createFetch(data);
  };

  const createFetch = (data: object) => {
    fetch(`${URI}/api/dishes/new`, {
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

  const handleOnChange = (e: any) => {
    const type = e.target.value;
    type === "vegan"
      ? setVeganType(!veganType)
      : type === "spicy"
      ? setSpicyType(!spicyType)
      : type === "vegetarian" && setVegetarianType(!vegetarianType);
  };

  return (
    <div
      className="edit-modal-container"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h1>Create New Dish</h1>
      <label>Dish Name:</label>
      <input
        type="text"
        placeholder="Enter dish name"
        onChange={(event) => setName(event.target.value)}
      />
      <label>Description:</label>
      <input
        type="text"
        placeholder="Details on the dish"
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

      <label>Price:</label>
      <input
        type="number"
        onChange={(event) => {
          setPrice(event.target.value);
        }}
      />

      <label>Types:</label>
      <div>
        <input
          type="checkbox"
          value="vegan"
          name="type"
          onChange={(e) => handleOnChange(e)}
          checked={veganType}
        />
        <label htmlFor="vegan">Vegan</label>
      </div>

      <div>
        <input
          type="checkbox"
          value="spicy"
          name="type"
          onChange={(e) => handleOnChange(e)}
          checked={spicyType}
        />

        <label htmlFor="spicy">Spicy</label>
      </div>

      <div>
        <input
          type="checkbox"
          value="vegetarian"
          name="type"
          onChange={(e) => handleOnChange(e)}
          checked={vegetarianType}
        />

        <label htmlFor="vegetarian">vegetarian</label>
      </div>

      <label>Select restaurant:</label>
      <select
        onChange={(event) => {
          setRestaurant(event.target.value);
        }}
      >
        {restaurants.map((item: any, index: number) => {
          return (
            <option key={index} value={item._id}>
              {item.name}
            </option>
          );
        })}
      </select>

      <button onClick={createDish}>Create New Dish</button>
    </div>
  );
}
