const router = require('express').Router();

const CartModel = require('../../models/Carts');

const { isAuthenticated } = require('../middlewares/authentication');

router.get('/', [isAuthenticated], async (req, res, next) => {
  try {
    const cart = await CartModel.findOne({ userId: req.user }).populate({
      path: 'productsQuantity.productId'
    });
    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    next(error);
  }
});

router.put('/add/:productId', [isAuthenticated], async (req, res, next) => {
  const { productId } = req.params;
  const { quantity = 1 } = req.query;

  try {
    const numQuantity = Number(quantity);

    if (Number.isNaN(numQuantity)) {
      const error = new Error('not a number');
      error.code = 422;
      throw error;
    }

    const userCart = await CartModel.findOne({ userId: req.user });

    if (!userCart) {
      const result = await CartModel.create({
        userId: req.user,
        productsQuantity: [
          {
            productId,
            quantity: numQuantity
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

    let isProductFound = false;

    const newProducts = prevProductsQuantity.map((product) => {
      if (product.productId.toString() === productId) {
        isProductFound = true;
        return { ...product, quantity: numQuantity + product.quantity };
      }
      return product;
    });

    if (isProductFound) {
      const result = await CartModel.findOneAndUpdate(
        { userId: req.user },
        { productsQuantity: newProducts },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        count: newProducts.length,
        data: result
      });
    }

    const result = await CartModel.findOneAndUpdate(
      { userId: req.user },
      {
        $push: { productsQuantity: { productId, quantity: numQuantity } }
      },
      { new: true }
    );

    const products = result.get('productsQuantity');

    res.status(200).json({
      success: true,
      count: products.length,
      data: { products }
    });
  } catch (error) {
    next(error);
  }
});

router.put('/remove/:productId', [isAuthenticated], async (req, res, next) => {
  const { productId } = req.params;
  const { quantity = 1 } = req.query;

  try {
    const numQuantity = Number(quantity);

    if (Number.isNaN(numQuantity)) {
      const error = new Error('not a number');
      error.code = 422;
      throw error;
    }

    const userCart = await CartModel.findOne({ userId: req.user });

    // Transformar el array del subesquema en un array de objetos reales de JS
    const prevProductsQuantity = userCart
      .get('productsQuantity')
      .map((el) => el.toObject());

    let isProductFound = false;

    const removedProducts = prevProductsQuantity
      .map((product) => {
        if (product.productId.toString() === productId) {
          isProductFound = true;
          return { ...product, quantity: product.quantity - numQuantity };
        }
        return product;
      })
      .filter((product) => product.quantity >= 1);

    if (isProductFound) {
      const result = await CartModel.findOneAndUpdate(
        { userId: req.user },
        { productsQuantity: removedProducts },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        count: removedProducts.length,
        data: result
      });
    }

    const result = await CartModel.findOneAndUpdate(
      { userId: req.user },
      {
        $push: { productsQuantity: { productId, quantity: numQuantity } }
      },
      { new: true }
    );

    const products = result.get('productsQuantity');

    res.status(200).json({
      success: true,
      count: products.length,
      data: { products }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
