const mongoose = require('mongoose');

const { Schema } = mongoose;

const FavoritesSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'Users',
      unique: true,
      required: true
    },
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Products'
      }
    ]
  },
  {
    timestamps: true
  }
);

const Favorites = mongoose.model('Favorites', FavoritesSchema);
module.exports = Favorites;
