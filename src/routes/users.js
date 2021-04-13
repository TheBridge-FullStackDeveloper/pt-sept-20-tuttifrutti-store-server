const router = require('express').Router();
const omitBy = require('lodash/omitBy');

const UserModel = require('../../models/Users');

const { isAuthenticated } = require('../middlewares/authentication');

router.put('/modify/:userId', async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error('user not found');
    }

    const filteredUser = omitBy(req.body, (value, _) => !value);

    const result = await UserModel.findByIdAndUpdate(userId, filteredUser, {
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
      throw new Error('User not found');
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(401).json({ data: error.message });
  }
});

module.exports = router;
