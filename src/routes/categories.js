const router = require('express').Router();
const uniq = require('lodash/uniq');

const ProductModel = require('../../models/Products');

router.get('/', async (_, res, next) => {
  try {
    const categories = uniq(
      (await ProductModel.find({}, { category: 1, _id: 0 })).map(
        (category) => category.category
      )
    );

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
