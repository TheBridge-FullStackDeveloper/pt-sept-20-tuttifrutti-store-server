const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    productsQuantity: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductQuantitySchema'
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
    }
  },
  {
    timestamps: true
  }
);

const model = mongoose.model('Orders', OrderSchema);

module.exports = model;
