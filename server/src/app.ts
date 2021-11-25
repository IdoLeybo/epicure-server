import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";
import bodyParser from "body-parser";
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app: Application = express();
const api = require("../routes");

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded());
app.use(
  express.static("/Users/idoleybovitch/Desktop/epicure-server/client/build")
);
app.use("/api", api);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);

module.exports = app;
