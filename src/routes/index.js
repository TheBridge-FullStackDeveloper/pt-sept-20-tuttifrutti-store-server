const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/products', require('./products'));

router.use('/auth', require('./auth'));

module.exports = router;
