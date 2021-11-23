import { Router, Request, Response } from "express";
const mongoose = require("mongoose");
const dishes = Router();
const Dish = require("../models/dish");
const Restaurant = require("../models/restaurant");
const makeObjectId = mongoose.Types.ObjectId;

dishes.get("/", (req: Request, res: Response) => {
  Dish.find({}).then((data: object[]) => {
    res.status(200).send(data);
  });
});

dishes.post("/new", async (req: Request, res: Response) => {
  const data = req.body;

  const restaurant = await Restaurant.findById({
    _id: data.restaurant,
  });

  const chef = new Dish({
    name: data.name,
    image: data.image,
    description: data.description,
    typeIcon: data.typeIcon,
    price: data.price,
    restaurant: makeObjectId(restaurant._id),
  });
  chef
    .save()
    .then(() => {
      res.status(200).redirect("/");
    })
    .catch((err: Error) => {
      res.status(500).send(err.message);
    });
});

module.exports = dishes;
