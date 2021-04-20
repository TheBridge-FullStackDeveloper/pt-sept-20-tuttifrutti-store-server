const router = require('express').Router();

const OrderModel = require('../../models/Orders');

const { isAuthenticated } = require('../middlewares/authentication');

router.get('/:orderId', [isAuthenticated], async (req, res, next) => {
  const { orderId } = req.params;

  try {
    const result = await OrderModel.findById(orderId);

    if (!result) throw new Error('order not found');

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
