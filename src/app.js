const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();


app.post("/signUp", async (req, res) => {
    //Creating a new instance of the User model
    const user = new User({
    firstName: "Amisha",
    lastName: "Agrawal",
    email: "amisha@gmail.com",
    password: "amisha22",
    });

    try{     
        //Saving the user to the database
        await user.save()
        res.send("User added successfully...");
    } catch(err){
        res.status(400).send("Error addding the user: " + err.message);

    }

});




// Connection to Database

connectDB().then( () => {
    console.log("Database connected successfully....")
    //Connection to Server
    app.listen("3000", () => {
        console.log("Server is connected successfully at port no. 3000")
    });
})
.catch((err) => {
    console.error("Database cannot be connected..")
});







































