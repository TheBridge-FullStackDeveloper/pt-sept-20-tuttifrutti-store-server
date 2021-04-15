const mongoose = require('mongoose');

const { Schema } = mongoose;
const ProductQuantitySchema = require('./ProductQuantity');

const CartsSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Products'
    }
  ],
  quantity: [ProductQuantitySchema]
});

const Carts = mongoose.model('Carts', CartsSchema);
module.exports = Carts;
