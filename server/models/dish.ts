import mongoose, { Schema } from "mongoose";

const dishSchema = new Schema({
  name: { type: String, required: true, default: "" },
  image: { type: String, required: true, default: "" },
  description: { type: String, required: true, default: "" },
  typeIcon: { type: Object },
  price: { type: String, required: true, default: "" },
  restaurant: { type: Schema.Types.ObjectId, ref: "restaurant" },
});

module.exports = mongoose.model("Dish", dishSchema);
