const router = require('express').Router();

const CartModel = require('../../models/Carts');
// const ProductQuantitySchema = require('../../models/ProductQuantity');

const { isAuthenticated } = require('../middlewares/authentication');

router.put('/add/:productId', [isAuthenticated], async (req, res, next) => {
  const { productId } = req.params;

  try {
    const userCart = await CartModel.findOne({ userId: req.user });

    if (!userCart) {
      const result = await CartModel.create({
        userId: req.user,
        productsQuantity: [
          {
            productId,
            quantity: 1
          }
        ]
      });

      return res.status(201).json({
        success: true,
        count: result.productsQuantity.length,
        data: { products: result.productsQuantity }
      });
    }

    // Transformar el array del subesquema en un array de objetos reales de JS
    const prevProductsQuantity = userCart
      .get('productsQuantity')
      .map((el) => el.toObject());

    const newArr = [...prevProductsQuantity, { productId, quantity: 2 }];

    const result = await CartModel.findOneAndUpdate(
      { userId: req.user },
      { productsQuantity: newArr },
      { new: true }
    );

    return res.status(200).json(result);

    // TODO Change code to support adding multiple products
    // if (products.includes(productId)) {
    //   throw new Error('product already in favorite list');
    // }

    // await CartModel.findOneAndUpdate(
    //   { userId: req.user },
    //   { $push: { products: productId } }
    // );

    // res.status(200).json({
    //   success: true,
    //   count: products.length + 1,
    //   data: { products: [...products, productId] }
    // });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
