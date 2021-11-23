import React from "react";
import Chef from "./Chef";
import { chef } from "../../interfaces/index.interface";

export default function Chefs(props: any) {
  const chefs = props.chefs;
  return (
    <div>
      <h1>Chefs</h1>
      {chefs.map((chef: chef) => {
        return <Chef key={chef.id} details={chef} />;
      })}
    </div>
  );
}
