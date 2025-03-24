const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("../src/utils/validation"); 
const bcrypt = require("bcrypt");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth")

// Middleware to parse JSON requests to javascript
app.use(express.json());

//Middleware to parse cookies
app.use(cookieParser());




//FOR ADDING THE USERS IN THE DATABASE
app.post("/signUp", async (req, res) => {
    
    // const skills = user.skills;
    // const age = user.age;
   


    try{   
        //Validating the data
        validateSignUpData(req);

        const {firstName, lastName, email, password} = req.body;

        //Encrypting the password
        const passwordHash =  await bcrypt.hash(password, 10 );
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
             
        
    } catch(err){
        res.status(400).send("Error addding the user: " + err.message);

    }

});

//FOR LOGGING THE EXISTING USER

app.post("/login", async (req, res) => {

    try{

    const { email, password } = req.body;

    //Checking if the user exists in the database
    const user = await User.findOne({ email });

    //If the user doesn't exist
    if(!user){
        throw new Error("User not found");
    }

    //Checking if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    //If the password is correct
    if(isPasswordValid){

        //Create a JWT Token

        const token = await jwt.sign({_id: user._id}, "DEV@Tinder$790",{expiresIn: "1d"});


        //Add the token to cookie and send the response back to the user

        res.cookie("token", token);
        res.send("Logged in successfully...");









        
    }else{
        throw new Error("Invalid password");
    }
    

} catch(err){
        res.status(400).send("ERROR: " + err.message);

    }

    
});

//FOR PROFIEL

app.get("/profile", userAuth, async (req, res) => {

    try{
        const user = req.user;
        res.send(user);

    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);

    }

    

});



//For CONNECTION REQUEST
app.post("/sendConnectionRequest", userAuth, async (req,res) => {

    try{

        const user = req.user;

        console.log("Sending the Connection Request");
        res.send(user.firstName+ " sent the connection!!");
        
    }catch(err){
        res.status(400).send("ERROR: " + err.message);

    }

});



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

connectDB().then( () => {
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







































