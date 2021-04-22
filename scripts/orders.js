const OrdersModel = require('../models/Orders');
const ProductsModel = require('../models/Products');
const UsersModel = require('../models/Users');

const productCount = process.env.PRODUCTS_ROWS || 5;

const createOrders = async () => {
  const users = await UsersModel.find({});

  const userOrders = [];

  for (const user of users) {
    const id = user.get('_id');

    const products = [];

    for (let i = 0; i < 4; i++) {
      const rnd = Math.floor(Math.random() * productCount);

      const product = await ProductsModel.findOne().skip(rnd);
      const productId = product.get('_id');
      const newProduct = {
        productId,
        quantity: 1
      };
      products.push(newProduct);
    }

    const newUserOrder = {
      userId: id,
      productsQuantity: products,
      totalPrice: 378,
      state: 'pending-payment'
    };

    userOrders.push(newUserOrder);
  }

  await OrdersModel.insertMany(userOrders);

  console.info('> Orders collection added!');
};

const dropOrders = async () => {
  await OrdersModel.deleteMany({});

  console.info('> Orders collection deleted!');
};

module.exports = {
  createOrders,
  dropOrders
};
