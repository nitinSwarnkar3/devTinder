const express = require('express');
const { userAuth } = require("../middlewares/auth")
const profileRouter = express.Router();
const { validateEditProfileData, validatePasswordData } = require("../utils/validation");
const bcrypt = require("bcrypt");

//FOR PROFILE
profileRouter.get("/profile/view", userAuth, async (req, res) => {

    try {
        const user = req.user;
        res.send(user);

    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);

    }



});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {

        if (!validateEditProfileData(req)) {
            throw new Error("Invalid Edit Request!");
        }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();
        res.send(`${loggedInUser.firstName}, your profile updated successfully!!`);



    } catch (err) {
        res.status(400).send("ERROR: " + err.message);

    }


});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {

    const { oldPassword, newPassword } = req.body;

    try {
        if (validatePasswordData(req)) {
            throw new Error("Invalid Password Request!");
        }
        const loggedInUser = req.user;
        console.log("Old Password" + loggedInUser.password);
        if (!(await bcrypt.compare(oldPassword, loggedInUser.password))) {
            throw new Error("Current password is incorrect!");
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        loggedInUser.password = hashedPassword;
        console.log("New Password: " + loggedInUser.password);
        await loggedInUser.save();
        res.send(`${loggedInUser.firstName}, your password updated successfully!!`);



    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = profileRouter;