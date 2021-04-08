const mongoose = require('mongoose');

const { Schema } = mongoose;

const CartsSchema = newSchema ({

    _id: {
        type: string,
        required: true,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required: true,
    },

    products: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
    },
    ],
    
         timestamp: true,
    
    });


const model = mongoose.model('Users', CartsShema);

module.exports = model;