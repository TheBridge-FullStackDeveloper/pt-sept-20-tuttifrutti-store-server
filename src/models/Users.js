const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true
    },
    surname: {
      type: String,
      required: true,
      lowercase: true
    },
    street: {
      type: String,
      lowercase: true
    },
    houseNum: {
      type: Number,
      lowercase: true
    },
    aptNum: {
      type: String,
      lowercase: true
    },
    zipcode: {
      type: Number,
      max: 6
    },
    city: {
      type: String,
      lowercase: true
    },
    country: {
      type: String,
      lowercase: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: 'Please enter a valid email'
      },
      required: [true, 'Email required']
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 20
    },
    phone: {
      type: Number,
      max: 12
    },
    active: {
      type: Boolean
    },
    creditCard: {
      type: Number,
      min: 16,
      max: 16
    },
    expirationDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const model = mongoose.model('Users', UserSchema);

module.exports = model;
