const mongoose = require('mongoose');

const ProductQuantitySchema = require('./ProductQuantity');

const { Schema } = mongoose;

const CartsSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  productsQuantity: [ProductQuantitySchema]
});

const Carts = mongoose.model('Carts', CartsSchema);
module.exports = Carts;
