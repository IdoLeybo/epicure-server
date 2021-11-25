import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import axios from "axios";
export const URI = process.env.URI || "http://localhost:8080";

export default function Main(props: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurantsArr, setRestaurantsArr] = useState([]);
  const [chefsArr, setChefsArr] = useState([]);
  const [dishArr, setDishArr] = useState([]);
  const setAdmin = props.setAdmin;
  const admin = JSON.parse(localStorage.getItem("admin") as any);

  useEffect(() => {
    if (isLoading === true) {
      getAllData();
      setIsLoading(false);
    }
  }, []);

  const getAllData = async () => {
    const res = await fetch(`${URI}/api/all`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${admin.token}`,
      },
    });
    const data = await res.json();
    data.map((obj: any) => {
      obj.name === "chefs"
        ? setChefsArr(obj.data)
        : obj.name === "restaurants"
        ? setRestaurantsArr(obj.data)
        : setDishArr(obj.data);
    });
    return data;
  };

  return (
    <AdminNav
      restaurants={restaurantsArr}
      chefs={chefsArr}
      dishes={dishArr}
      setAdmin={setAdmin}
    />
  );
}
