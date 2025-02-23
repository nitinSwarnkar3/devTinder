const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

// Middleware to parse JSON requests to javascript
app.use(express.json());



//FOR ADDING THE USERS IN THE DATABASE
app.post("/signUp", async (req, res) => {
    //Creating a new instance of the User model
    const user = new User(req.body);


    try{     
        //Saving the user to the database
        await user.save()
        res.send("User added successfully...");
    } catch(err){
        res.status(400).send("Error addding the user: " + err.message);

    }

});


//GET ALL USERS BY EMAILID 
// app.get("/user", async (req, res) => {
//     const userEmail = req.body.email;

//     try{
//         const users = await User.find({email: userEmail});

//         if(users.length === 0){
//             res.status(404).send("User not found");
//         }else{
//             res.send(users);
//         }  

//     }catch(err){
//         res.status(404).send("Something went wrong..");

//     }

    
// })


//GET 1 USER BY EMAILID IF WE HAVE SAME EMAILID TO 2 USERS IN DATABASE
app.get("/user", async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if (!user){
            res.status(404).send("User not found");    
        }else{
            res.send(user);
        }
        

    }catch(err){
        res.status(404).send("Something went wrong..");
    }
});


//FEED API - GET /feed - get all the users from the database

app.get("/feed", async (req, res) => {

    try{
        const users = await User.find({})
        res.send(users);

    }catch(err){
        res.status(404).send("Something went wrong..");

    }

});

//For DELETE THE DATA FROM DATABASE

app.delete("/user", async (req, res) => {

    const userId = req.body.userId;

    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully...")

    }catch(err){
        res.status(404).send("Something went wrong..");

    }
})


//FOR UPDATE THE DATA FROM DATABASE

app.patch("/user", async (req, res) => {
    const userId = req.body._id;
    const data = req.body;

    try{
        await User.findByIdAndUpdate(userId, data);
        res.send("User updated successfully...");

    }catch(err){
        res.status(404).send("Something went wrong..");

    }
});




// Connection to Database

connectDB().then( () => {
    console.log("Database connnection established...");
    app.listen("3000", () => {
        console.log("Server is connected successfully at port no. 3000")
    });
}).catch((err) => {
    console.error("Error connecting to database")
})

































// connectDB().then( () => {
//     console.log("Database connected successfully....")
//     //Connection to Server
//     app.listen("3000", () => {
//         console.log("Server is connected successfully at port no. 3000")
//     });
// })
// .catch((err) => {
//     console.error("Database cannot be connected..")
// });







































