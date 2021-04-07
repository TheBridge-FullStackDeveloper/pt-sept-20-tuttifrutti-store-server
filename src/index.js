const express = require("express");

const app = express();

require("./configs/db");

app.listen(3000, () => console.info("> listening at http://localhost:3000"));
