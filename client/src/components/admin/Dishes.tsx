import React from "react";
import Dish from "./Dish";
import { dish } from "../../interfaces/index.interface";

export default function Dishes(props: any) {
  const dishes = props.dishes;
  return (
    <div>
      <h1>Dishes</h1>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {dishes.map((dish: dish, index: any) => {
          return <Dish key={index} details={dish} />;
        })}
      </div>
    </div>
  );
}
