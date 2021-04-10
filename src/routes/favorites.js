const router = require('express').Router();

const FavoritesModel = require('../../models/Favorites');

const { isAuthenticated } = require('../middlewares/authentication');

router.get('/all', [isAuthenticated], async (req, res, next) => {
  const { id } = req.user;

  try {
    const result = await FavoritesModel.findOne(
      { userId: id },
      { favorites: 1, _id: 0 }
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
