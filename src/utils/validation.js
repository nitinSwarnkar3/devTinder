const validate = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("First name and last name are required.");
    }else if(!validate.isEmail(email)){
        throw new Error("Email is not valid");
    }else if(!validate.isStrongPassword(password)){
        throw new Error("Please enter a strong password");
    }
}

module.exports = {
    validateSignUpData,
}