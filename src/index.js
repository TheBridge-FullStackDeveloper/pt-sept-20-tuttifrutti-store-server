const express = require('express');

require('./configs/db');

const app = express();

app.listen(3000, () => {
  console.log('App listening in http://localhost:3000');
});
