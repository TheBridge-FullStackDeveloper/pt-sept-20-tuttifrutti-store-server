require('../src/configs/db');
require('dotenv').config();

const { createUsers } = require('./users');
const { createProducts } = require('./products');

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
  } catch (error) {
    console.error(error);
  }
})();
