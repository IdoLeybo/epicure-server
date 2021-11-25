import { Router, Request, Response } from "express";
const chefs = Router();
const Chef = require("../models/chef");

chefs.get("/", (req: Request, res: Response) => {
  Chef.find({}).then((data: object[]) => {
    res.status(200).send(data);
  });
});

chefs.post("/new", (req: Request, res: Response) => {
  const data = req.body;

  const chef = new Chef({
    chefName: data.chefName,
    image: data.image,
    description: data.description,
    valid: true,
    // restaurants: data.restaurants,
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

chefs.put("/update/:id", async (req: Request, res: Response) => {
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
});

module.exports = chefs;
