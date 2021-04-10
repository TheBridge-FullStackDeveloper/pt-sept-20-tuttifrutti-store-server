const router = require('express').Router();

const FavoritesModel = require('../../models/Favorites');

const { isAuthenticated } = require('../middlewares/authentication');

router.post('/add/:productId', [isAuthenticated], async (req, res, next) => {
  const { productId } = req.params;

  try {
    const userFavs = await FavoritesModel.findOne({ userId: req.user });

    if (!userFavs) {
      const result = await FavoritesModel.create({
        userId: req.user,
        products: [productId]
      });

      res.status(200).json({
        success: true,
        data: result
      });
    }

    if (userFavs.products.includes(productId)) {
      throw new Error('product already in favorite list');
    }

    const result = await FavoritesModel.findOneAndUpdate(
      { userId: req.user },
      { $push: { products: productId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
