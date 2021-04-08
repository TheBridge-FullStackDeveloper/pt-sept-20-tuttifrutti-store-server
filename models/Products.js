const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
    category: {
        type: String, 
        required: true,
        lowercase: true,
    },
    stock: {
        type: Number, 
        required: true, 
    }, 
    productRef: {
        type: String, 
        required: true, 
        lowercase: true,
    }, 
    productName: {
        type: String, 
        required: true,
        lowercase: true,
    }, 
    brand: {
        type: String, 
        required: true, 
        lowercase: true,
    }, 
    price: {
        type: Number, 
        required: true, 
    }, 
    pictures: {
        type: Array, 
        required: true, 
    }, 
    description: {
        type: String, 
    },
    weight: {
        type: Number, 
    }
},
{
  timestamps: true, 
});

const model = mongoose.model("Products", ProductSchema);

module.exports = model;
