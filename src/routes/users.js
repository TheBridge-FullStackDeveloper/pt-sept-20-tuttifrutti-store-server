const router = require('express').Router();
const omitBy = require('lodash/omitBy');

const UserModel = require('../../models/Users');

const { isAuthenticated } = require('../middlewares/authentication');

router.put('/modify/', [isAuthenticated], async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user);

    if (!user) {
      throw new Error('user not found');
    }

    const filteredUser = omitBy(req.body, (value, _) => !value);

    const result = await UserModel.findByIdAndUpdate(req.user, filteredUser, {
      new: true
    });

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

router.get('/profile', [isAuthenticated], async (req, res, next) => {
  try {
    const userId = req.user;

    const result = await UserModel.findById(userId, { password: 0 });
    if (!result) {
      const error = new Error('User not found');
      error.code = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(401).json({ success: false, data: error.message });
  }
});

module.exports = router;
