const faker = require('faker');

const ProductModel = require('../models/Products');

const randomizeWeight = () => (Math.random() > 0.5 ? 'kg' : 'g');

const createProducts = async (rowsCount, seed) => {
  const entries = Array.from({ length: rowsCount }, (_, i) => i);

  const products = [];

  for (const entry of entries) {
    seed && faker.seed(seed + entry);

    const {
      commerce,
      datatype: { number, float, uuid },
      company: { companyName },
      image: { food }
    } = faker;
    const category = commerce.department();
    const stock = number();
    const productRef = uuid();
    const productName = commerce.product();
    const brand = companyName();
    const price = commerce.price();
    const pictures = [food(), food(), food()];
    const description = commerce.productDescription();
    const weight = float();
    const weightType = randomizeWeight();

    products.push(
      new ProductModel({
        category,
        stock,
        productRef,
        productName,
        brand,
        price,
        pictures,
        description,
        weight,
        weightType
      })
    );
  }

  await ProductModel.insertMany(products);

  console.info('> products inserted!');
};

const dropProducts = async () => {
  await ProductModel.deleteMany({});

  console.info('> products collection deleted!');
};

module.exports = {
  createProducts,
  dropProducts
};
