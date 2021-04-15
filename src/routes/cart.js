const router = require('express').Router();

const CartModel = require('../../models/Carts');

const { isAuthenticated } = require('../middlewares/authentication');

router.put('/add/:productId', [isAuthenticated], async (req, res, next) => {
  const { productId } = req.params;

  try {
    const userCart = await CartModel.findOne({ userId: req.user });

    if (!userCart) {
      const result = await CartModel.create({
        userId: req.user,
        products: [productId]
      });

      return res.status(201).json({
        success: true,
        count: result.products.length,
        data: { products: [] }
      });
    }

    const products = userCart.get('products');

    console.log(products);

    // TODO Change code to support adding multiple products
    if (products.includes(productId)) {
      throw new Error('product already in favorite list');
    }

    await CartModel.findOneAndUpdate(
      { userId: req.user },
      { $push: { products: productId } }
    );

    res.status(200).json({
      success: true,
      count: products.length + 1,
      data: { products: [...products, productId] }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
