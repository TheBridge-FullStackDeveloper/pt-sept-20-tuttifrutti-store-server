const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('models/Users.js');

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            const salt = bcrypt.genSaltSync(20);
            const hash = bcrypt.hashSync(password, salt);

            const newUser = new User({
              email,
              password: hash
            });

            newUser
              .save()
              .then(() => done(null, newUser))
              .catch((err) => done(err, null));
          } else {
            throw new Error('User already exists');
          }
        })
        .catch((err) => done(err, null));
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
    done(null, user.id)
})