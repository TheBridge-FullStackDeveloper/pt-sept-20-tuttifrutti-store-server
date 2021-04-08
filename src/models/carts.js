const mongoose = require("mongoose");
const { Schema } = mongoose;
const CartsSchema = newSchema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
  ],
});

const model = mongoose.model("Carts", CartsShema);
module.exports = model;
