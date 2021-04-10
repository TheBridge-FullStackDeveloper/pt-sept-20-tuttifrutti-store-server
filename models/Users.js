const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true
    },
    surname: {
      type: String,
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
      type: String
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
      required: true
    },
    phone: {
      type: Number,
      maxlength: 9
    },
    active: {
      type: Boolean
    },
    creditCard: {
      type: String,
      maxlength: 16
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
