const router = require('express').Router();
const passport = require('passport');

const { isAuthenticated } = require('../middlewares/authentication');

router.get('/profile', [isAuthenticated], (req, res) =>
  res.status(200).json({ data: req.user, success: true })
);

router.post('/register', (req, res, next) => {
  passport.authenticate('register', (err, user) => {
    if (err) {
      return res.status(402).json({ data: err.message, success: false });
    }
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return res.status(401).json({ data: loginErr.message, success: false });
      }
      res.status(200).json({ data: user, success: true });
    });
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
  passport.authenticate('login', (err, user) => {
    if (err) {
      return res.status(402).json({ data: err.message, success: false });
    }
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return res.status(401).json({ data: loginErr.message, success: false });
      }
      res.status(200).json({ data: req.user, success: true });
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();

  res.status(200).json({ data: 'OK' });
});
module.exports = router;
