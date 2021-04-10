const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/categories', require('./categories'));

module.exports = router;
