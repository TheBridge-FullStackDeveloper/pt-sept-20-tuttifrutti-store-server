const router = require('express').Router();

const ProductModel = require('../../models/Products');

router.get('/', async (req, res, next) => {
  const perPage = 25;
  const page = req.query.page || 1;

  try {
    const result = await ProductModel.find({})
      .skip(perPage * page - perPage)
      .limit(perPage);

    const nextPage =
      result.length < perPage ? null : `/products?page=${Number(page) + 1}`;

    res.status(200).json({
      success: true,
      count: result.length,
      currentPage: page,
      nextPage: nextPage,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

router.get('/category', async (req, res, next) => {
  const { category } = req.query;
  const perPage = 25;
  const { page } = req.query || 1;

  try {
    const result = await ProductModel.find({ category })
      .skip(perPage * page - perPage)
      .limit(perPage);

    const nextPage =
      result.length < perPage
        ? null
        : `/category/?category='${category}'&page=${Number(page) + 1}`;

    res.status(200).json({
      success: true,
      count: result.length,
      currentPage: page,
      nextPage: nextPage,
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
