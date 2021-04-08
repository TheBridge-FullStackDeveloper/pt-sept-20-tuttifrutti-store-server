require("../src/configs/db");

const { createUsers } = require("./users");

const DEFAULT_ROWS = 5;
const SEED = 123;

try {
  createUsers(DEFAULT_ROWS, SEED);
} catch (error) {
  console.error(error);
}
