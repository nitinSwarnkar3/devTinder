const express = require('express');
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authRouter = express.Router();


//FOR ADDING THE USERS IN THE DATABASE 
authRouter.post("/signUp", async (req, res) => {

    // const skills = user.skills;
    // const age = user.age;
    try {
        //Validating the data
        validateSignUpData(req);

        const { firstName, lastName, email, password } = req.body;

        //Encrypting the password
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);

        //Creating a new instance of the User model
        const user = new User(({
            firstName,
            lastName,
            email,
            password: passwordHash,
        }));

        //Saving the user to the database
        await user.save()
        res.send("User added successfully...");


    } catch (err) {
        res.status(400).send("Error addding the user: " + err.message);

    }

});

//FOR LOGGING THE EXISTING USER
authRouter.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        //Checking if the user exists in the database
        const user = await User.findOne({ email });

        //If the user doesn't exist
        if (!user) {
            throw new Error("User not found");
        }

        //Checking if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        //If the password is correct
        if (isPasswordValid) {

            //Create a JWT Token

            const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", { expiresIn: "1d" });

            //Add the token to cookie and send the response back to the user

            res.cookie("token", token);
            res.send("Logged in successfully...");

        } else {
            throw new Error("Invalid password");
        }


    } catch (err) {
        res.status(400).send("ERROR: " + err.message);

    }


});

//FOR LOGGING OUT THE USER
authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null);

    res.send("Logged out successfully...");
});






module.exports = authRouter;