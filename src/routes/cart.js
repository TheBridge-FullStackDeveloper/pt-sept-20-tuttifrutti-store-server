const router = require('express').Router();

const CartModel = require('../../models/Carts');

const { isAuthenticated } = require('../middlewares/authentication');

router.put('/add/:productId', [isAuthenticated], async (req, res, next) => {
  const { productId } = req.params;

  try {
    const userFavs = await CartModel.findOne({ userId: req.user });

    if (!userFavs) {
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

    if (userFavs.products.includes(productId)) {
      throw new Error('product already in favorite list');
    }

    const result = await CartModel.findOneAndUpdate(
      { userId: req.user },
      { $push: { products: productId } },
      { new: true }
    );

    const products = result.get('products');

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
