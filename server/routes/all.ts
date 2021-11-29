import { Router, Request, Response } from "express";
import {
  chefRestaurants,
  chefsAggregate,
  dishesAggregate,
} from "../aggregations/aggregation";
const all = Router();
const Chef = require("../models/chef");
const Restaurant = require("../models/restaurant");
const Dish = require("../models/dish");
const { validateToken } = require("../src/JWT");

all.get("/", validateToken, (req: Request, res: Response) => {
  const allData: any = [];
  const verify = { valid: true };
  Chef.find(verify).then((data: object[]) => {
    allData.push({ name: "chefs", data: data });

    Restaurant.find(verify).then((data: object[]) => {
      allData.push({ name: "restaurants", data: data });

      Dish.find(verify).then((data: object[]) => {
        allData.push({ name: "dishes", data: data });

        res.status(200).send(allData);
      });
    });
  });
});

all.get("/data", validateToken, (req: Request, res: Response) => {
  const allData: any = [];
  const verify = { valid: true };
  Chef.find(verify).then((data: object[]) => {
    const chef: any = data.filter((item: any) => {
      if (item.chefName === "Yossi Shitrit") {
        return item;
      }
    });
    const id = chef[0]._id;
    allData.push({ name: "chefs", data: data });

    Chef.aggregate(chefRestaurants(id)).then((data: object[]) => {
      allData.push({ name: "chefRestaurants", data: data });

      Restaurant.aggregate(chefsAggregate(verify)).then((data: object[]) => {
        allData.push({ name: "restaurants", data: data });

        Dish.aggregate(dishesAggregate(verify)).then((data: object[]) => {
          allData.push({ name: "dishes", data: data });

          res.status(200).send(allData);
        });
      });
    });
  });
});

module.exports = all;
