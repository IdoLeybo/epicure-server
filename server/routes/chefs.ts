import { Router, Request, Response } from "express";
import { chefAggregate } from "../aggregations/aggregation";
const chefs = Router();
const Chef = require("../models/chef");
const Dish = require("../models/dish");
const Restaurant = require("../models/restaurant");
const { validateToken } = require("../src/JWT");
const { chefRestaurants } = require("../aggregations/aggregation");

chefs.get("/", validateToken, (req: Request, res: Response) => {
  Chef.find({}).then((data: object[]) => {
    res.status(200).send(data);
  });
});

chefs.get(
  "/restaurants/:id",
  validateToken,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      let response = await Chef.findOne({ _id: id });
      if (!response) res.status(404).send("Chef ID not found");

      const aggregation = chefRestaurants(response);
      Chef.aggregate(aggregation)
        .then((data: any) => {
          const restaurants = data[0].restaurants;
          res.send(restaurants);
        })
        .catch((err: Error) => {
          res.send({ error: err });
        });
    } catch (err) {
      res.status(500).send({ error: err });
    }
  }
);

chefs.post("/new", validateToken, (req: Request, res: Response) => {
  const data = req.body;

  const chef = new Chef({
    chefName: data.chefName,
    image: data.image,
    description: data.description,
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

chefs.post(
  "/update/:id",
  validateToken,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    try {
      let updata = await Chef.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });
      res.status(203).send(updata);
    } catch (err) {
      res.status(404).send(`Error: ID not found`);
    }
  }
);

chefs.post(
  "/delete/:id",
  validateToken,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    let response = await Chef.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    const aggregation = chefAggregate(response);
    Chef.aggregate(aggregation)
      .then((data: any) => {
        const restaurants = data[0].restaurants;
        const dishes = data[0].dishes;
        restaurants.map(async (item: any) => {
          await Restaurant.findOneAndUpdate(
            { _id: item._id },
            { valid: false },
            { new: true }
          );
        });
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

module.exports = chefs;
