const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const app = express();
const PORT = 3001;
require("./configs/db");

app.use(cors())

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//aqui las urls...
//app.use('/products', require).....

app.use((req, res, next) => {
  next(new Error("Path Not Found"));
});

app.use((error, _, res, __) => {
  res.status(400).json({
    success: false,
    message: error.message,
  });
});

app.listen(PORT, () => console.info(`> listening at http://localhost:${PORT}`));
