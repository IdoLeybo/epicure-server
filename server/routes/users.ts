import { Router, Request, Response } from "express";
const users = Router();
const User = require("../models/user");

users.get("/", (req: Request, res: Response) => {
  User.find({}).then((data: object[]) => {
    res.status(200).send(data);
  });
});

users.post("/new", (req: Request, res: Response) => {
  const data = req.body;
  const user = new User({
    firstName: data.firstName,
    lastName: data.lastName,
  });
  user
    .save()
    .then(() => {
      res.status(200).redirect("/api/users");
    })
    .catch((err: Error) => {
      res.status(500).send(err.message);
    });
});

users.delete("/:id", (req: Request, res: Response) => {
  const ID = req.params.id;
  if (!ID) res.status(400).send(`ERROR: Not give id`);
  User.deleteOne({ id: ID })
    .then(() => {
      res.status(204).redirect("/api/users");
    })
    .catch(() => {
      res.status(404).send(`ERROR: ID -> ${ID} was not found!`);
    });
});

module.exports = users;
