const isAuthenticated = (req, res, next) => {
  if (process.env.PREVENT_AUTH) return next();

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
