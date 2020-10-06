const mongoose = require("mongoose");
const User = require("./User.model");
const Product = require("./Product.model");

const reviewSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    score: {
        type: String,
        required: [true, "Score is required"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (document, toReturn) => {
        toReturn.id = document._id;
        delete toReturn.__v;
        delete toReturn._id;
        delete toReturn.createdAt;
        delete toReturn.updatedAt;
        return toReturn;
      },
    },
  }
);

reviewSchema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'review',
  justOne: false,
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
