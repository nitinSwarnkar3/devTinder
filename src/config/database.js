const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://nitin_node:t6Xs49swloAKWitu@nitinnode.nu7w1.mongodb.net/DevTinder");
}

module.exports = connectDB;


// const mongoose = require("mongoose");

// const connectDB = async () => {
//     await mongoose.connect(
//         "mongodb+srv://nitin_node:t6Xs49swloAKWitu@nitinnode.nu7w1.mongodb.net/DevTinder"
//         );
// };

// module.exports = connectDB;
