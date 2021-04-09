require('../src/configs/db');

const { dropProducts } = require('./products');
const { dropUsers } = require('./users');
(async () => {
  try {
    await dropProducts();
    await dropUsers();
  } catch (error) {
    console.info('> error: ', error);
  }
})();
