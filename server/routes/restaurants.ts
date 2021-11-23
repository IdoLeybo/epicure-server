import { Router, Request, Response } from "express";
const mongoose = require("mongoose");
const restaurants = Router();
const Restaurant = require("../models/restaurant");
const Chef = require("../models/chef");
const makeObjectId = mongoose.Types.ObjectId;

restaurants.get("/", (req: Request, res: Response) => {
  try {
    Restaurant.find({}).then((data: object[]) => {
      res.status(200).send(data);
    });
  } catch (e) {
    res.status(400).send(`Error: ${e}`);
  }
});

restaurants.post("/new", async (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);

  const chef = await Chef.findById({ _id: data.chef });

  console.log(chef);

  const restaurant = new Restaurant({
    name: data.name,
    image: data.image,
    chef: makeObjectId(chef._id),
  });

  restaurant
    .save()
    .then(() => {
      res.status(200).redirect("/");
    })
    .catch((err: Error) => {
      res.status(500).send(err.message);
    });
});

restaurants.put("/update/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  try {
    let updata = await Restaurant.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    res.status(203).send(updata);
  } catch (err) {
    res.status(404).send(`Error: ID not found`);
  }
});

module.exports = restaurants;
