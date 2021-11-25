import React, { useEffect, useState } from "react";
import axios from "axios";
import { URI } from "../AdminSystem";

export default function ChefModal(props: any) {
  const details = props.details;
  const [name, setName] = useState(details.name);
  const [image, setImage] = useState(details.image);
  const [description, setDescription] = useState(details.description);
  const [typeIcon, setTypeIcon] = useState(details.typeIcon);
  const [price, setPrice] = useState(details.price);
  const [restaurant, setRestaurant] = useState(details.restaurant);

  const [veganType, setVeganType] = useState(details.typeIcon["vegan"]);
  const [spicyType, setSpicyType] = useState(details.typeIcon["spicy"]);
  const [vegetarianType, setVegetarianType] = useState(
    details.typeIcon["vegetarian"]
  );
  const restaurants = props.restaurants;

  const updateDish = (id: string) => {
    setTypeIcon(
      ((typeIcon["vegan"] = veganType),
      (typeIcon["spicy"] = spicyType),
      (typeIcon["vegetarian"] = vegetarianType))
    );

    const data = {
      name: name,
      image: image,
      description: description,
      typeIcon: typeIcon,
      price: price,
      restaurant: restaurant,
    };
    axios.put(`${URI}/api/dishes/update/${id}`, data).catch((err) => {
      throw err;
    });
  };

  const deleteDish = (id: string) => {
    const data = {
      valid: false,
    };
    axios.put(`${URI}/api/dishes/update/${id}`, data).catch((err) => {
      throw err;
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
    <form
      className="edit-modal-container"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h1>Edit Dish details</h1>
      <label>Dish Name:</label>
      <input
        type="text"
        value={name}
        placeholder={details.name}
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

      <label>Price:</label>
      <input
        type="number"
        value={price}
        placeholder={details.price}
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
      {/* 
      <label>Select restaurant:</label>
      <select
        value={restaurant}
        placeholder={details.restaurant}
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
        <option value={details.restaurant}>{details.restaurant}</option>
        <option value="restaurant2">restaurant2</option>
      </select> */}

      <button onClick={() => updateDish(details._id)}>Update</button>
      <button onClick={() => deleteDish(details._id)}>Delete Dish</button>
    </form>
  );
}
