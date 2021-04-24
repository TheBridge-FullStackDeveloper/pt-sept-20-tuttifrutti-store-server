const router = require('express').Router();

const OrderModel = require('../../models/Orders');
const CartModel = require('../../models/Carts');
const ProductModel = require('../../models/Products');

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
        stock: 1,
        price: 1
      }
    });

    const populatedCartProducts = cart
      .get('productsQuantity')
      .map((el) => el.toObject());

    const checkedProducts = populatedCartProducts.map((product) => {
      if (product.productId.stock === 0) {
        const error = new Error(
          'Product with no stock cannot be added to order'
        );
        error.code = 403;
        throw error;
      }
      if (product.quantity >= product.productId.stock) {
        return { ...product, quantity: product.productId.stock };
      }
      return product;
    });

    const totalPriceByProduct = checkedProducts.map(
      (product) => product.productId.price * product.quantity
    );

    const totalPrice = totalPriceByProduct.reduce((acc, next) => {
      return acc + next;
    }, 0);

    const result = await OrderModel.create({
      userId: req.user,
      totalPrice,
      state: 'pending-payment',
      productsQuantity: checkedProducts
    });

    const cartId = cart._id.toString();

    await CartModel.findByIdAndDelete(cartId);

    for (const product of checkedProducts) {
      const productId = product.productId._id;
      const quantityToRemove = product.quantity;

      await ProductModel.findByIdAndUpdate(productId, {
        $inc: { stock: -quantityToRemove }
      });
    }

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

    if (!result) {
      const error = new Error('order not found');
      error.code = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
