const isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  }
  const error = new Error('Unauthorized');
  error.code = 403;
  next(error);
};

module.exports = {
  isAuthenticated
};
