const router = require('express').Router();

const ProductModel = require('../../models/Products');

router.get('/', async (req, res, next) => {
  try {
    const result = await ProductModel.find({});

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
