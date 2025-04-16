const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

// Middleware to parse JSON requests to javascript
app.use(express.json());

//Middleware to parse cookies
app.use(cookieParser());


const authRouter = require("../src/routes/auth");
const profileRouter = require("../src/routes/profile");
const requestRouter = require("../src/routes/requests");
const userRouter = require("../src/routes/user");


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);





// //GET ALL USERS BY EMAILID 
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


// });


// //GET 1 USER BY EMAILID IF WE HAVE SAME EMAILID TO 2 USERS IN DATABASE
// app.get("/user", async (req, res) => {
//     try{
//         const user = await User.findOne({email: req.body.email});
//         if (!user){
//             res.status(404).send("User not found");    
//         }else{
//             res.send(user);
//         }


//     }catch(err){
//         res.status(404).send("Something went wrong..");
//     }
// });


// //FEED API - GET /feed - get all the users from the database

// app.get("/feed", async (req, res) => {

//     try{
//         const users = await User.find({})
//         res.send(users);

//     }catch(err){
//         res.status(404).send("Something went wrong..");

//     }

// });

// //For DELETE THE DATA FROM DATABASE

// app.delete("/user", async (req, res) => {

//     const userId = req.body.userId;

//     try{
//         const user = await User.findByIdAndDelete(userId);
//         res.send("User deleted successfully...")

//     }catch(err){
//         res.status(404).send("Something went wrong..");

//     }
// });


// //FOR UPDATE THE DATA FROM DATABASE

// app.patch("/user/:userId", async (req, res) => {
//     const userId = req.params?.userId;
//     const data = req.body;

//     try{
//         const ALLOWED_UPDATES = [
//             "about",
//             "gender",
//             "age",
//             "skills",
//             "photoUrl", 
//             "password",

//         ];

//         const isUpdateAllowed = Object.keys(data).every((k) => 
//             ALLOWED_UPDATES.includes(k)
//         );

//         if(!isUpdateAllowed) {
//             throw new Error("Updates not Allowed!");
//         }
//         await User.findByIdAndUpdate(userId, data, {
//             runValidators: true,
//         });
//         res.send("User updated successfully...");

//     }catch(err){
//         res.status(404).send("Updation Failed!" + err.message);

//     }
// });


// Connection to Database

connectDB().then(() => {
    console.log("Database connnection established...");
    app.listen("3000", () => {
        console.log("Server is connected successfully at port no. 3000");
    });
}).catch((err) => {
    console.error("Error connecting to database");
});

































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







































