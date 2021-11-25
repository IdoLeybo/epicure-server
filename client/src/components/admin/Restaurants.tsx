import React, { useState } from "react";
import Restaurant from "./Restaurant";
import { restaurant } from "../../interfaces/index.interface";

export default function Restaurants(props: any) {
  const restaurants = props.restaurants;

  return (
    <div>
      <h1>Restaurants</h1>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {restaurants.map((restaurant: restaurant) => {
          return <Restaurant key={restaurant.id} details={restaurant} />;
        })}
      </div>
    </div>
  );
}
