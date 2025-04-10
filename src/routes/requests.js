const express = require('express');
const { userAuth } = require("../middlewares/auth")

const requestRouter = express.Router();

const ConnectionRequest = require("../models/connectionRequest");
const User = require('../models/user');

//For CONNECTION REQUEST
requestRouter.post("/request/send/:status/:receiverId", userAuth, async (req, res) => {

    try {

        const senderId = req.user._id;
        const receiverId = req.params.receiverId;
        const status = req.params.status;

        const allowedStatus = ["interested", "ignored"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).send("Invalid status type: " + status);
        }

        //check if user exist in our database or not

        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(404).json({
                message: "User not found!"
            });
        }


        // check if the user has already sent a request to this receiver

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId },
            ]
        });

        if (existingConnectionRequest) {
            return res.status(400).send("Connection request has already sent!");
        }

        const connectionRequest = new ConnectionRequest({
            senderId,
            receiverId,
            status,
        });

        const data = await connectionRequest.save();

        if (status === "interested") {
            res.json(
                {
                    message: req.user.firstName + " is " + status + " in " + receiver.firstName,
                    data,
                }
            );
        } else {
            res.json(
                {
                    message: req.user.firstName + " " + status + " " + receiver.firstName,
                    data,
                }
            );

        }


    } catch (err) {
        res.status(400).send("ERROR: " + err.message);

    }

});

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const status = req.params.status;
        const requestId = req.params.requestId;

        const allowedStatus = ["accepted", "rejected"];

        //CHECKING THAT STATUS IS ALLOWED OR NOT
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Status not allowed!!" });
        }

        //CHECKING THAT REQUEST ID IS AVAILAIBLE IN THE DATABASE OR NOT
        const connectionRequest = await ConnectionRequest.findOne({

            _id: requestId,
            receiverId: loggedInUser._id,
            status: "interested",
        });

        if (!connectionRequest) {
            return res.status(404).json({ message: "Connection request not found!" });
        }

        connectionRequest.status = status;
        const data = await connectionRequest.save();

        res.json({ message: "Connection request " + status, data })

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
})

module.exports = requestRouter;
