const router = require('express').Router();

const FavoritesModel = require('../../models/Favorites');

const { isAuthenticated } = require('../middlewares/authentication');

router.get('/', [isAuthenticated], async (req, res, next) => {
  try {
    const userFavs = await FavoritesModel.findOne({ userId: req.user });

    if (!userFavs) {
      const result = await FavoritesModel.create({
        userId: req.user,
        products: []
      });


      return res.status(201).json({
        success: true,
        count: result.products.length,
        data: { products: result.products }
      });
    }

    const products = userFavs.get('products');

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
});

router.get('/all', [isAuthenticated], async (req, res, next) => {
  try {
    const userFavs = await FavoritesModel.findOne({
      userId: req.user
    }).populate('products');

    if (!userFavs) {
      const result = await FavoritesModel.create({
        userId: req.user,
        products: []
      });

      res.status(201).json({
        success: true,
        count: result.products.length,
        data: { products: result.products }
      });
    }

    const products = userFavs.get('products');

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
});

router.put('/add/:productId', [isAuthenticated], async (req, res, next) => {
  const { productId } = req.params;

  try {
    const userFavs = await FavoritesModel.findOne({ userId: req.user });

    if (!userFavs) {
      const result = await FavoritesModel.create({
        userId: req.user,
        products: [productId]
      });

      return res.status(201).json({
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

router.put('/remove/:productId', [isAuthenticated], async (req, res, next) => {
  const { productId } = req.params;

  try {
    const result = await FavoritesModel.findOneAndUpdate(
      { userId: req.user },
      { $pullAll: { products: [productId] } },
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
