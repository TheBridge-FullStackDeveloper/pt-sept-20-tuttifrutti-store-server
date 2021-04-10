require('../src/configs/db');

const { createUsers } = require('./users');
const { createProducts } = require('./products');

const DEFAULT_ROWS = 5;
const PRODUCT_ROWS = 20;
const SEED = 123;

(async () => {
  try {
    await createUsers(DEFAULT_ROWS, SEED);
    await createProducts(PRODUCT_ROWS, SEED);
  } catch (error) {
    console.error(error);
  }
})();
