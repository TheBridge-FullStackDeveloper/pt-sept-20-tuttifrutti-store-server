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

module.exports = router;
