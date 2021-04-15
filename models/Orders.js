const mongoose = require('mongoose');
const { Schema } = mongoose;
const ProductQuantitySchema = require('./ProductQuantity');

const OrderSchema = new Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
      }
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    },
    totalPrice: {
      type: Number,
      required: true
    },
    state: {
      type: String,
      enum: ['paid', 'pending-payment', 'sent', 'delivered'],
      default: 'pending-payment',
      required: true
    },
    quantity: [ProductQuantitySchema]
  },
  {
    timestamps: true
  }
);

const model = mongoose.model('Orders', OrderSchema);

module.exports = model;
