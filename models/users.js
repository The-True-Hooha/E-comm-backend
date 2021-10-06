const mongoose = require("mongoose");
//const JOi = require("joi");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 50,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 225,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
}, {timestamps: true }
);

//module.exports = mongoose.models("users", UserSchema); 
//gets an error for replacing with ("./api/routes/api")
//had to change to exports.UserSchema
exports.UserSchema = UserSchema;