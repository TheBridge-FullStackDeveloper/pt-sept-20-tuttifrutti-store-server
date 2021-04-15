const faker = require('faker');
const bcrypt = require('bcrypt');

const UserModel = require('../models/Users');

const userCount = process.env.USERS_ROWS || 50;

const active = () => Math.random() > 0.5;

const formatNonDigits = (string) => Number(string.replace(/\D/g, ''));

const rnd = Math.floor(Math.random() * userCount);

const createUsers = async (rowsCount, seed) => {
  const entries = Array.from({ length: rowsCount }, (_, i) => i);

  const users = [];

  for (const entry of entries) {
    seed && faker.seed(seed + entry);

    const {
      name,
      phone,
      address,
      internet: { email, password },
      finance: { creditCardNumber },
      date: { future }
    } = faker;
    const firstName = name.firstName();
    const lastName = name.lastName();
    const street = address.streetName();
    const houseNum = address.streetAddress().split(' ')[0];
    const aptNum = address.secondaryAddress();
    const zipCode = address.zipCode();
    const city = address.city();
    const country = address.country();
    const mail = email();
    const pswd = password();
    const hash = bcrypt.hashSync(pswd, 10);
    const phoneNumber = formatNonDigits(phone.phoneNumber());
    const isActive = active();
    const creditCard = formatNonDigits(creditCardNumber().substring(0, 16));
    const monthExpirationDate = future().getMonth();
    const yearExpirationDate = future().getFullYear();

    if (entry === rnd) console.log({ mail, pswd });

    users.push(
      new UserModel({
        name: firstName,
        surname: lastName,
        street,
        houseNum,
        aptNum,
        zipcode: zipCode,
        city,
        country,
        email: mail,
        password: hash,
        phone: phoneNumber,
        active: isActive,
        creditCard,
        monthExpirationDate,
        yearExpirationDate
      })
    );
  }

  await UserModel.insertMany(users);

  console.info('> users inserted!');
};

const dropUsers = async () => {
  await UserModel.deleteMany({});

  console.info('> users collection deleted!');
};

module.exports = {
  createUsers,
  dropUsers
};
