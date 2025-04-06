const validate = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("First name and last name are required.");
    } else if (!validate.isEmail(email)) {
        throw new Error("Email is not valid");
    } else if (!validate.isStrongPassword(password)) {
        throw new Error("Please enter a strong password");
    }
}

const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "email", "photoUrl", "age", "gender", "about", "skills"];

    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));

    return isEditAllowed;

}

const validatePasswordData = (req) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new Error("Old and new password are required.");
    } else if (!validate.isStrongPassword(newPassword)) {
        throw new Error("Please enter a strong password");
    } else if (oldPassword === newPassword) {
        throw new Error("Old and new password should not be same.");
    }
}

module.exports = {
    validateSignUpData,
    validateEditProfileData,
    validatePasswordData,
}