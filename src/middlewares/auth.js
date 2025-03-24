const jwt = require("jsonwebtoken");
const User = require("../models/user");

//USER AUTH
const userAuth = async  (req,res,next) => {

    try{

        //Read the token from req cookies

        const cookies = req.cookies;

        const { token } = cookies;

        if(!token){
            throw new Error("Invalid Token, authorization denied");
        }
        //Validate the  token

        const decodedObj = await jwt.verify(token, "DEV@Tinder$790");
        
        const { _id } = decodedObj;

        const user = await User.findById({ _id});
        //Find the user

        if(!user){
            throw new Error("User not found");
        }

        req.user = user; //add user to req object
        next();

    }catch(err){
        res.status(400).send("ERROR: " + err.message);

    }
    

  

};

module.exports = {
    
    userAuth
}