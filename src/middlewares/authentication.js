const isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  }
  const error = new Error('Unauthorized');
  error.code = 401;
  next(error);
};

module.exports = {
  isAuthenticated
};
