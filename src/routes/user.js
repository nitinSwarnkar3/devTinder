const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");


userRouter.get("/user/requests/received", userAuth, async (req, res) => {

    try {

        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            receiverId: loggedInUser._id,
            status: "interested",

        }).populate("senderId", "firstName lastName age gender photoUrl skills about");
        // }).populate("senderId", ["firstName", "lastName"]);

        res.json({
            message: "Connection fetched Successfully!!",
            data: connectionRequests,
        });


    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }

});

userRouter.get("/user/allConnections", userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { senderId: loggedInUser._id, status: "accepted" },
                { receiverId: loggedInUser._id, status: "accepted" },
            ]
        }).populate("senderId", "firstName lastName age gender photoUrl skills about")
            .populate("receiverId", "firstName lastName age gender photoUrl skills about");

        const data = await connectionRequest.map((row) => {
            if (row.senderId._id.toString() === loggedInUser._id.toString()) {
                return row.receiverId;
            }
            return row.senderId;
        });

        res.json({
            data,
        });

    } catch (err) {
        res.status(400).send("ERROR " + err.message);
    }
});


userRouter.get("/user/feed", userAuth, async (req, res) => {

    try {
        const loggedInUser = req.user;

        const page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);

        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        const connectionRequests = await ConnectionRequest.find({

            $or: [{
                senderId: loggedInUser._id,
            },
            {
                receiverId: loggedInUser._id
            },
            ]

        }).select("senderId receiverId")

        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hideUsersFromFeed.add(req.senderId.toString());
            hideUsersFromFeed.add(req.receiverId.toString());
        });

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } },
                { _id: { $ne: loggedInUser._id } },
            ]
        }).select("firstName lastName age gender photoUrl skills about").skip(skip).limit(limit);

        res.send(users);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }

});

module.exports = userRouter;


