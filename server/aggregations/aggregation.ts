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

export function chefRestaurants(id: any) {
  return [
    {
      $match: {
        _id: new makeObjectId(id),
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
  ];
}

export function chefsAggregate(verify: any) {
  return [
    {
      $match: verify,
    },
    {
      $lookup: {
        from: "chefs",
        localField: "chef",
        foreignField: "_id",
        as: "chef",
      },
    },
    { $unwind: "$chef" },
  ];
}

export function dishesAggregate(verify: any) {
  return [
    {
      $match: verify,
    },
    {
      $lookup: {
        from: "restaurants",
        localField: "restaurant",
        foreignField: "_id",
        as: "restaurant",
      },
    },
    { $unwind: "$restaurant" },
    {
      $lookup: {
        from: "chefs",
        localField: "restaurant.chef",
        foreignField: "_id",
        as: "restaurant.chef",
      },
    },
    { $unwind: "$restaurant.chef" },
  ];
}
