const isAuthenticated = (req, res, next) =>
  req.user ? next() : next(new Error('Unauthorized'));

module.exports = {
  isAuthenticated
};
