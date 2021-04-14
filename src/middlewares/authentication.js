const isAuthenticated = (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    const error = new Error('Unauthorized');
    error.code = 401;
    return next(error);
  }
};

module.exports = {
  isAuthenticated
};
