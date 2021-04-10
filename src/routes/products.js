const router = require('express').Router();

const ProductModel = require('../../models/Products');

router.get('/', async (_, res, next) => {
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

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await ProductModel.findById(id);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
