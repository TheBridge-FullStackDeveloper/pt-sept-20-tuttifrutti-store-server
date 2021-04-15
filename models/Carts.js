const mongoose = require('mongoose');

const { Schema } = mongoose;

const CartsSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  productsQuantity: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductQuantity'
    }
  ]
});

const Carts = mongoose.model('Carts', CartsSchema);
module.exports = Carts;
