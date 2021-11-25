import { Router } from "express";
const restaurants = require("./restaurants");
const users = require("./users");
const chefs = require("./chefs");
const dishes = require("./dishes");
const all = require("./all");

const api = Router();

api.use("/restaurants", restaurants);
api.use("/users", users);
api.use("/chefs", chefs);
api.use("/dishes", dishes);
api.use("/all", all);

module.exports = api;
