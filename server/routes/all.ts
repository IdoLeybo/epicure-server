import { Router, Request, Response } from "express";
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

module.exports = all;
