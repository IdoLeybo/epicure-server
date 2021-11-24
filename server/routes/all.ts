import { Router, Request, Response } from "express";
const all = Router();
const Chef = require("../models/chef");
const Restaurant = require("../models/restaurant");
const Dish = require("../models/dish");

all.get("/", (req: Request, res: Response) => {
  const allData: any = [];
  Chef.find({}).then((data: object[]) => {
    allData.push({ name: "chefs", data: data });

    Restaurant.find({}).then((data: object[]) => {
      allData.push({ name: "restaurants", data: data });

      Dish.find({}).then((data: object[]) => {
        allData.push({ name: "dishes", data: data });

        res.status(200).send(allData);
      });
    });
  });
});

module.exports = all;
