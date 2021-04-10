const router = require('express').Router();
const passport = require('passport');

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

module.exports = router;
