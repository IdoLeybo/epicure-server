import { Router } from "express";
const restaurants = require("./restaurants");
const users = require("./users");

const api = Router();

api.use("/restaurants", restaurants);
api.use("/users", users);

module.exports = api;
