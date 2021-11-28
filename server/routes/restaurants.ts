import { Router, Request, Response } from "express";
const mongoose = require("mongoose");
const restaurants = Router();
const Restaurant = require("../models/restaurant");
const Chef = require("../models/chef");
const Dish = require("../models/dish");
const { validateToken } = require("../src/JWT");
const makeObjectId = mongoose.Types.ObjectId;
const { restaurantAggregate } = require("../aggregations/aggregation");

restaurants.get("/", validateToken, (req: Request, res: Response) => {
  try {
    Restaurant.find({}).then((data: object[]) => {
      res.status(200).send(data);
    });
  } catch (e) {
    res.status(400).send(`Error: ${e}`);
  }
});

restaurants.post("/new", validateToken, async (req: Request, res: Response) => {
  const data = req.body;
  const chef = await Chef.findById({ _id: data.chef });

  const restaurant = new Restaurant({
    name: data.name,
    image: data.image,
    chef: makeObjectId(chef._id),
    valid: true,
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

restaurants.post(
  "/update/:id",
  validateToken,
  async (req: Request, res: Response) => {
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
  }
);

restaurants.post(
  "/delete/:id",
  validateToken,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;

    let response = await Restaurant.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    const aggregation = restaurantAggregate(response);
    Restaurant.aggregate(aggregation)
      .then((data: any) => {
        const dishes = data[0].dishes;
        dishes.map(async (item: any) => {
          await Dish.findOneAndUpdate(
            { _id: item._id },
            { valid: false },
            { new: true }
          );
        });
        res.send(data);
      })
      .catch((err: Error) => {
        console.log(err);
        res.status(400).send(err);
      });
  }
);

module.exports = restaurants;
