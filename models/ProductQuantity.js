const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductQuantitySchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Products'
    },
    quantity: { type: Number }
  },
  {
    timestamps: true
  }
);

module.exports = ProductQuantitySchema;
