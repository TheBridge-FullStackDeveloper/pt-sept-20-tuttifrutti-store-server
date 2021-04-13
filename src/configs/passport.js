const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../../models/Users');

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    (_req, email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            const hash = bcrypt.hashSync(password, 10);
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

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // Receive req in case more fields are needed when registering user
    },
    (req, email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          // If there is no user in DB, register it
          if (!user) {
            throw new Error('User does not exist');
          }

          const userPassword = user.get('password');
          const isValidPassword = bcrypt.compareSync(password, userPassword);

          if (!isValidPassword) {
            throw new Error('Incorrect email and password');
          }

          done(null, user);
        })
        .catch((err) => done(err, null));
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const userId = process.env.PREVENT_AUTH ? process.env.DUMMY_USER : id;
  done(null, userId);
});
