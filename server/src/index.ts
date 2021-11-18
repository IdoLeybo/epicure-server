require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");
const env = process.env.NODE_ENV || "production";
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8080;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`connected to MongoDB - ${env}`);
    app.listen(PORT, () => {
      console.log(`app listening on ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
