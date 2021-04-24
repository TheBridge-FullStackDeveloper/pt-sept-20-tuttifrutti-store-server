require('../src/configs/db');

const { dropProducts } = require('./products');
const { dropUsers } = require('./users');
const { dropFavs } = require('./favorites');
const { dropOrders } = require('./orders');

(async () => {
  try {
    await dropProducts();
    await dropUsers();
    await dropFavs();
    await dropOrders();
  } catch (error) {
    console.info('> error: ', error);
  }
})();
