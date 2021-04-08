const express = require('express');
const cors = require('cors');

require('./configs/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// aqui las urls...
// app.use('/products', require).....

app.use((_, __, next) => {
  next(new Error('Path Not Found'));
});

app.use((error, _, res, __) => {
  res.status(400).json({
    success: false,
    message: error.message
  });
});

const PORT = 3001;
app.listen(PORT, () => console.info(`> Listening at http://localhost:${PORT}`));
