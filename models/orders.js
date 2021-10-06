const mongoose = require("mongoose");
//const JOi = require("joi");

const OrderSchema = new mongoose.Schema({

//THE userID IDENTIFIERS THE USER AND GENERATE AN ID FOR THE USER
    userId: {
        type: String,
        required: true,
    },

//THE PRODUCT SCHEMA HAS AN ARRAY THAT CAN CONTAIN DIFFERENT HAS AN ARRAY THAT CAN CONTAIN DIFFERENT PROPERTIES TO BE DISPLAYED
    products: [
        {
            productId: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1 
            }
        }
    ],
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true         
    },
    status: {
        type: String,
        default: "pending"
    },
}, {timestamps: true }
);

//module.exports = mongoose.models("orders", OrderSchema);
exports.OrderSchema = OrderSchema;
 