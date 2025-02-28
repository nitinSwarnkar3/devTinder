const mongoose = require('mongoose');

//TO CREATE SCHEMA

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,

        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        
        },
        password: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            min: 18,
        },
        gender: {
            type: String,
            validate(value){
                if(!['male', 'female', 'other'].includes(value)){
                    throw new Error('Gender should be male, female or other.');
                }

            }
        },
        skills:{
            type: [String],
        }
    },{
        timestamps: true,
    }
);

//TO CREATE MODEL

const User = mongoose.model("User", userSchema);

module.exports = User;