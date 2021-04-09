const constants = {
  PORT: process.env.PORT || 4000,
  hashSecret: process.env.HASH_SECRET || 'dev_secret'
};

module.exports = constants;
