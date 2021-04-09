const mongoose = require('mongoose');

const { Schema } = mongoose;

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
  ]
});

const Carts = mongoose.model('Carts', CartsSchema);
module.exports = Carts;