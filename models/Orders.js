const mongoose = require('mongoose');

const ProductQuantitySchema = require('./ProductQuantity');

const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    },
    productsQuantity: [ProductQuantitySchema],
    totalPrice: {
      type: Number,
      required: true
    },
    state: {
      type: String,
      enum: ['paid', 'pending-payment', 'sent', 'delivered'],
      default: 'pending-payment',
      required: true
    }
  },
  {
    timestamps: true
  }
);

const model = mongoose.model('Orders', OrderSchema);

module.exports = model;
