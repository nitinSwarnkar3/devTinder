const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Namaste!!");
});

app.get("/home", (req, res) => {
    res.send("Namaste from Home");
});

app.listen("3000", () => {
    console.log("Server is connected successfully at port no. 3000")
});


































// const express = require("express");

// const app = express();

// app.use("/", (req, res) => {
//     res.send("Namaste !!");
// });

// app.use("/home", (req, res) => {
//     res.send("Namaste from the Home!!");
// });

// app.use("/login", (req, res) => {
//     res.send("Namaste from the Login!!");
// });

// app.listen(3000, () => {
//     console.log("Server is successfully listening on port no. 3000");
// });