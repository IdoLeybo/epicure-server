import mongoose from "mongoose";
const makeObjectId = mongoose.Types.ObjectId;

export function chefAggregate(data: any) {
  return [
    {
      $match: {
        _id: new makeObjectId(data._id),
      },
    },
    {
      $lookup: {
        from: "restaurants",
        localField: "_id",
        foreignField: "chef",
        as: "restaurants",
      },
    },
    {
      $lookup: {
        from: "dishes",
        localField: "restaurants._id",
        foreignField: "restaurant",
        as: "dishes",
      },
    },
  ];
}

export function restaurantAggregate(data: any) {
  return [
    {
      $match: {
        _id: new makeObjectId(data._id),
      },
    },
    {
      $lookup: {
        from: "dishes",
        localField: "_id",
        foreignField: "restaurant",
        as: "dishes",
      },
    },
  ];
}
