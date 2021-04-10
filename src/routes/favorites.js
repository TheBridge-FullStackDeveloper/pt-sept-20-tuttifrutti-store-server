const router = require('express').Router();

const FavoritesModel = require('../../models/Favorites');

const { isAuthenticated } = require('../middlewares/authentication');

router.get('/all', [isAuthenticated], async (req, res, next) => {
  try {
    const userFavs = await FavoritesModel.findOne({ userId: req.user });

    if (!userFavs) {
      const result = await FavoritesModel.create({
        userId: req.user,
        products: []
      });

      res.status(200).json({
        success: true,
        count: result.products.length,
        data: { products: result.products }
      });
    }

    const result = await FavoritesModel.findOne(
      { userId: req.user },
      { products: 1, _id: 0 }
    );

    res.status(200).json({
      success: true,
      count: result.length,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
