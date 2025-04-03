const express = require('express');
const { userAuth } = require("../middlewares/auth")

const requestRouter = express.Router();

//For CONNECTION REQUEST
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {

    try {

        const user = req.user;

        console.log("Sending the Connection Request");
        res.send(user.firstName + " sent the connection!!");

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);

    }

});

module.exports = requestRouter;
