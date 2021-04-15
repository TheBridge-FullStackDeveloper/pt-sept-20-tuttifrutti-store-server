require('../src/configs/db');

const { dropProducts } = require('./products');
const { dropUsers } = require('./users');
const { dropFavs } = require('./favorites');

(async () => {
  try {
    await dropProducts();
    await dropUsers();
    await dropFavs();
  } catch (error) {
    console.info('> error: ', error);
  }
})();
