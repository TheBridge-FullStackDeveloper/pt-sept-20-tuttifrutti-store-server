const isAuthenticated = (req, res, next) => {
  if (process.env.PREVENT_AUTH) return next();
  return req.user ? next() : next(new Error('Unauthorized'));
};

module.exports = {
  isAuthenticated
};
