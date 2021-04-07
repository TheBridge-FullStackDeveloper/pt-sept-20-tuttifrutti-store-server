const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  client: {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    surname: {
      type: String,
      required: true,
      lowercase: true,
    },
  },

  address: {
    street: {
      type: String,
    },
    houseNum: {
      type: Number,
    },
    aptNum: {
      type: String,
    },
    zipcode: {
      type: Number,
      max: 6,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
    required: [true, "Email required"],
  },

  password: {
    type: String,
    required: true,
    min: 6,
    max: 20,
  },

  phone: {
    type: Number,
    max: 12,
  },

  active: {
    type: Boolean,
  },

  paymentMethod: {
    creditCard: {
      type: Number,
      min: 16,
      max: 16,
    },
    expirationDate: {
      type: Date,
    },
  },
});

const model = mongoose.model("Users", UserSchema);

module.exports = model;
