require('dotenv').config();
require('../src/configs/db');

const { createUsers } = require('./users');
const { createProducts } = require('./products');
const { createFavs } = require('./favorites');
const { createOrders } = require('./orders');

const DEFAULT_ROWS = 5;
const SEED = 123;

(async () => {
  const { USERS_ROWS, PRODUCTS_ROWS } = process.env;

  // eslint-disable-next-line no-unused-vars
  const [_, __, flag] = process.argv;

  const argsOpts = {
    randomness: SEED
  };

  try {
    await createUsers(USERS_ROWS || DEFAULT_ROWS, argsOpts[flag]);
    await createProducts(PRODUCTS_ROWS || DEFAULT_ROWS, argsOpts[flag]);
    await createFavs();
    await createOrders();
  } catch (error) {
    console.error(error);
  }
})();
