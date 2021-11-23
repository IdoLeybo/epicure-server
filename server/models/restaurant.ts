import mongoose, { Schema } from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, default: "" },
  image: { type: String, required: true, default: "" },
  chef: { type: Schema.Types.ObjectId, ref: "chef" },
});

restaurantSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
