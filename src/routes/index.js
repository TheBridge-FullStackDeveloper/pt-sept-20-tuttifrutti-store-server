const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/categories', require('./categories'));
router.use('/favorites', require('./favorites'));
router.use('/products', require('./products'));
router.use('/users', require('./users'));

module.exports = router;
