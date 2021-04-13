require('dotenv').config();
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

require('./configs/db');
require('./configs/passport');
const { PORT } = require('./configs/constants');

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(morgan('combined'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY || 'express-auth-cookie']
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./routes'));

app.use((_, __, next) => {
  next(new Error('Path Not Found'));
});

app.use((error, _, res, __) => {
  res.status(error.code || 400).json({
    success: false,
    message: error.message
  });
});

app.listen(PORT, () => console.info(`> Listening at http://localhost:${PORT}`));
