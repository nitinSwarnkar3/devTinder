const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

//Middleware concepts

app.use("/admin", adminAuth);



app.get("/user/getData", userAuth, (req, res) => {
    res.send("User data sent!");
})

app.get("/admin/getData", (req,res) => {
    res.send("All data Sent!");
});

app.get("/admin/deleteData", (req,res) =>{
    res.send("Data deleted successfully!");
})



app.listen("3000", () => {
    console.log("Server is connected successfully at port no. 3000")
});




































