const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: "{VALUE} is not a valid status."
        }
    }
}, {
    timestamps: true
});

connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    //CHECKING IF SENDER ID IS SAME AS RECEIVER ID
    if (connectionRequest.senderId.equals(connectionRequest.receiverId)) {
        throw new Error("Cannot send the connection request to yourself!!")
    }


    next();
});

const connectionRequestModel = new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);

module.exports = connectionRequestModel;