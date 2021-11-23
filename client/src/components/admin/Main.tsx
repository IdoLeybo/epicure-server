import React, { useEffect, useState } from "react";
import Chefs from "./Chefs";
import Restaurants from "./Restaurants";
import AdminHeader from "./AdminHeader";
import axios from "axios";
export const URI = process.env.URI || "http://localhost:8080";

export default function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurantsArr, setRestaurantsArr] = useState([]);
  const [chefsArr, setChefsArr] = useState([]);
  const [dishArr, setDishArr] = useState([]);

  useEffect(() => {
    if (isLoading === true) {
      axios.get(`${URI}/api/all`).then((res) => {
        const data = res.data;
        data.map((obj: any) => {
          obj.name === "chefs"
            ? setChefsArr(obj.data)
            : obj.name === "restaurants"
            ? setRestaurantsArr(obj.data)
            : setDishArr(obj.data);
        });
      });
    }

    setIsLoading(false);
  }, []);

  return (
    <>
      <AdminHeader
        restaurants={restaurantsArr}
        chefs={chefsArr}
        dishes={dishArr}
      />
    </>
  );
}
