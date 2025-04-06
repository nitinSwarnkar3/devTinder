const mongoose = require('mongoose');
const validator = require('validator');

//TO CREATE SCHEMA

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            minlength: 3,
            maxlength: 12,

        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email address.' + value);
                }
            }

        },
        password: {
            type: String,
            required: true,
            validate(value) {
                if (!validator.isStrongPassword(value)) {
                    throw new Error('Enter a strong Password.');
                }
            }
        },
        age: {
            type: Number,
            min: 18,
        },
        gender: {
            type: String,
            validate(value) {
                if (!['male', 'female', 'other'].includes(value)) {
                    throw new Error('Gender should be male, female or other.');
                }

            }
        },
        about: {
            type: String,
            maxlength: 200,
            default: "Here is the default about the user!"
        },
        skills: {
            type: [String],
        },
        photoUrl: {
            type: String,
            default: 'https://via.placeholder.com/150',
            validate(value) {
                if (!validator.isURL(value)) {
                    throw new Error('Invalid Photo URL...' + value);
                }
            }

        }
    }, {
    timestamps: true,
}
);

//TO CREATE MODEL

const User = mongoose.model("User", userSchema);

module.exports = User;