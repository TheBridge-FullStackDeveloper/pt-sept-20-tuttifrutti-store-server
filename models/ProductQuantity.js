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

const model = mongoose.model('ProductQuantity', ProductQuantitySchema);

module.exports = model;
