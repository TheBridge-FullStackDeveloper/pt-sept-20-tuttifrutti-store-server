const router = require('express').Router();

const ProductModel = require('../../models/Products');

router.get('/', async (_, res, next) => {
  try {
    const result = await ProductModel.find({});

    res.status(200).json({
      success: true,
      count: result.length,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

router.get('/category/:category', async (req, res, next) => {
  const { category } = req.params;

  try {
    const result = await ProductModel.find({ category });

    res.status(200).json({
      success: true,
      count: result.length,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await ProductModel.findById(id);

    if (!result) throw new Error('product not found');

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
