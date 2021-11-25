import mongoose, { Schema } from "mongoose";

const chefSchema = new mongoose.Schema({
  chefName: { type: String, required: true, default: "" },
  image: { type: String, required: true, default: "" },
  description: { type: String, required: true, default: "" },
  valid: { type: Boolean },
  // restaurants: [{ type: Schema.Types.ObjectId, ref: "restaurant" }],
});

chefSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Chef", chefSchema);
