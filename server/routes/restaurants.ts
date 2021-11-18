import { Router, Request, Response } from "express";
const restaurants = Router();
const Restaurant = require("../models/restaurant");

restaurants.get("/", (req: Request, res: Response) => {
  Restaurant.find({}).then((data: object[]) => {
    res.status(200).send(data);
  });
});

restaurants.post("/new", (req: Request, res: Response) => {
  const data = req.body;
  const restaurant = new Restaurant({
    name: data.firstName,
    chefName: data.lastName,
  });
  restaurant
    .save()
    .then(() => {
      res.status(200).redirect("/api/restaurants");
    })
    .catch((err: Error) => {
      res.status(500).send(err.message);
    });
});

module.exports = restaurants;
