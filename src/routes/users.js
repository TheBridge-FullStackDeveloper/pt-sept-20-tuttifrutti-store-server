const router = require('express').Router();
const omitBy = require('lodash/omitBy');

const UserModel = require('../../models/Users');

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

module.exports = router;
