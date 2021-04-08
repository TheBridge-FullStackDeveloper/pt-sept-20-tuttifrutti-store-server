const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      enum: ["paid", "pending-payment", "sent", "delivered"],
      default: "pending-payment",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const model = monggoose.model("Orders", OrderSchema);

module.exports = model;
