const mongoose = require('mongoose');

//TO CREATE SCHEMA

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        age: {
            type: Number,
        },
        gender: {
            type: String,
        }
    }
);

//TO CREATE MODEL

const User = mongoose.model("User", userSchema);

module.exports = User;