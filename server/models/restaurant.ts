import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  chefName: {
    type: String,
    required: true,
  },
});

const chefSchema = new mongoose.Schema({
  chefName: {
    type: String,
    required: true,
  },
  restaurants: [restaurantSchema],
});

restaurantSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
  },
});

chefSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
// module.exports = mongoose.model("Chef", chefSchema);
