const faker = require("faker");

const UserModel = require("../models/Users");

const active = () => Math.random() > 0.5;

const formatNonDigits = (phoneNumber) => Number(phoneNumber.replace(/\D/g, ""));

const createUsers = async (rowsCount, seed) => {
  const entries = Array.from({ length: rowsCount }, (_, i) => i);

  const users = [];

  for (let entry of entries) {
    seed && faker.seed(seed + entry);

    const {
      name,
      phone,
      address,
      internet: { email, password },
      finance: { creditCardNumber },
      date: { future },
    } = faker;
    const firstName = name.firstName();
    const lastName = name.lastName();
    const street = address.streetName();
    const houseNum = address.streetAddress().split(" ")[0];
    const aptNum = address.secondaryAddress();
    const zipCode = address.zipCode();
    const city = address.city();
    const country = address.country();
    const mail = email();
    const pswd = password();
    const phoneNumber = formatNonDigits(phone.phoneNumber());
    const isActive = active();
    const creditCard = formatNonDigits(creditCardNumber());
    const expirationDate = future();

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
        password: pswd,
        phone: phoneNumber,
        active: isActive,
        creditCard,
        expirationDate,
      })
    );
  }

  await UserModel.insertMany(users);

  console.info("> users inserted!");
};

module.exports = {
  createUsers,
};