const router = require('express').Router();

const OrderModel = require('../../models/Orders');
const CartModel = require('../../models/Carts');

const { isAuthenticated } = require('../middlewares/authentication');

router.get('/', [isAuthenticated], async (req, res, next) => {
  try {
    const userOrders = await OrderModel.find({ userId: req.user }).populate({
      path: 'productsQuantity.productId',
      select: {
        price: 1,
        brand: 1,
        productName: 1,
        productRef: 1,
        pictures: 1
      }
    });

    res.status(200).json({
      success: true,
      count: userOrders.length,
      data: { userOrders }
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', [isAuthenticated], async (req, res, next) => {
  try {
    const cart = await CartModel.findOne({ userId: req.user }).populate({
      path: 'productsQuantity.productId',
      select: {
        price: 1
      }
    });

    const populatedCartProducts = cart
      .get('productsQuantity')
      .map((el) => el.toObject());

    const totalPriceByProduct = populatedCartProducts.map(
      (product) => product.productId.price * product.quantity
    );
    const totalPrice = totalPriceByProduct.reduce((acc, next) => {
      return acc + next;
    }, 0);

    const result = await OrderModel.create({
      userId: req.user,
      totalPrice,
      state: 'pending-payment',
      productsQuantity: populatedCartProducts
    });

    const cartId = cart._id.toString();

    await CartModel.findByIdAndDelete(cartId);

    res.status(200).json({
      success: true,
      data: {
        orderId: result._id
      }
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:orderId', [isAuthenticated], async (req, res, next) => {
  const { orderId } = req.params;

  try {
    const result = await OrderModel.findById(orderId).populate({
      path: 'productsQuantity.productId',
      select: {
        price: 1,
        brand: 1,
        productName: 1,
        productRef: 1,
        pictures: 1
      }
    });

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
