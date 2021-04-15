const FavoritesModel = require('../models/Favorites');
const ProductsModel = require('../models/Products');
const UsersModel = require('../models/Users');

const productCount = process.env.PRODUCTS_ROWS || 5;

const createFavs = async () => {
  const users = await UsersModel.find({});

  const userFavs = [];

  for (const user of users) {
    const id = user.get('_id');

    const products = [];

    for (let i = 0; i < 4; i++) {
      const rnd = Math.floor(Math.random() * productCount);

      const product = await ProductsModel.findOne().skip(rnd);
      const productId = product.get('_id');
      products.push(productId);
    }

    const newUserFavs = {
      userId: id,
      products
    };

    userFavs.push(newUserFavs);
  }

  await FavoritesModel.insertMany(userFavs);

  console.info('> favorites collection added!');
};

const dropFavs = async () => {
  await FavoritesModel.deleteMany({});

  console.info('> favorites collection deleted!');
};

module.exports = {
  createFavs,
  dropFavs
};
