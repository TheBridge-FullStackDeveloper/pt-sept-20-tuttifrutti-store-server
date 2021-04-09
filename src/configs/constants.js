const constants = {
  PORT: process.env.PORT || 4000,
  hastSecret: process.env.HASH_SECRET || 'dev_secret'
};

module.exports = constants;
