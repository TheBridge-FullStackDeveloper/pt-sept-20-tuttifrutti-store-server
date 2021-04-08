const mongoose = require('mongoose');

const { Schema } = mongoose;

const CartsSchema = newSchema ({

    _id: {
        type: string,
        required: true,
    },

    userId: {
        type: string,
        required: true,
    },

    products: {
        type: string,
        required: true,
    },

    
         timestamp: true,
    
    });


const model = mongoose.model('user', CartsShema);

module.exports = model;