const monggose = require('mongoose');
const { Schema } = mongoose;

const FavoritesSchema = new Schema ({
    UserId: {
        type: monggose.Types.ObjectId,
        ref: 'Users',
        unique: true,
        required: true
    },
    Products: {
        type: monggose.Types.ObjectId,
        ref: 'Products',
        unique: true,

    },
    timestamp: true
});

const Favorites = mongoose.model('Favorites', FavoritesSchema);
module.exports = Favorites;