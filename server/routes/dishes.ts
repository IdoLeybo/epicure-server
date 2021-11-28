import { Router, Request, Response } from "express";
const mongoose = require("mongoose");
const dishes = Router();
const Dish = require("../models/dish");
const Restaurant = require("../models/restaurant");
const makeObjectId = mongoose.Types.ObjectId;
const { validateToken } = require("../src/JWT");

dishes.get("/", validateToken, (req: Request, res: Response) => {
  Dish.find({}).then((data: object[]) => {
    res.status(200).send(data);
  });
});

dishes.post("/new", validateToken, async (req: Request, res: Response) => {
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
    valid: true,
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

dishes.post(
  "/update/:id",
  validateToken,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    try {
      let updata = await Dish.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });
      res.status(203).send(updata);
    } catch (err) {
      res.status(404).send(`Error: ID not found`);
    }
  }
);

dishes.post(
  "/delete/:id",
  validateToken,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    try {
      let updata = await Dish.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });
      res.status(203).send(updata);
    } catch (err) {
      res.status(404).send(`Error: ID not found`);
    }
  }
);

module.exports = dishes;
