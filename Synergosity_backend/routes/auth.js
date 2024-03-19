const express = require("express");
const User = require('../models/user');
const bcrypt = require('bcrypt');
const {getToken} = require("../utils/helpers");
const router = express.Router();

router.post("/register", async (req, res) =>{
    //This is the function that will handle the register user logic

    //Step 1: Get the details from req.body
    
    const {firstName, lastName, email, password} = req.body;
    return;
    if( !firstName || !lastName || !email || !password ){
        return res.status(400).json({err:"Invalid Request body"});
        }
    //Step 2: We will check if a user with the same email already exists
    const existingUser = await User.findOne({email: email});
    if(existingUser){
        return res.status(402).json({err: "A user with this e-mail already exists."});
    }
    //Step 3: This is a legitimate user request. Now we will create the user.
    //If password is entered in the form of plaintext,it will be encrypted into random characters
    //I will store these characters in the database.
    //We can never decipher the encrypted password
    //No one has access to the user's password.
    //This encryption is known as 'Hashing'.
    const hashedPassword=await bcrypt.hash(password, 10);
const newUserDetails={firstname,lastname,email, password:hashedPassword};


const newUser = await User.create(newUserDetails);
//Step 4:I can use newUser to create a JWT and return the token to the user
const token=await getToken(email, newUser);
//We want to return the following to the user.
//1. The actual user created.
//2. The token.
const userToReturn={...newUser.toJSON(),token};
delete userToReturn.password;
return res.status(200).json(userToReturn);
} );

router.post("/login", async (req, res) => {
    //Step1: We get the details from req.body
    const {email, password} = req.body;
    if(!user){
        return res.status(401).json({err:"Invalid username or password"});
    }
    //Step2: Verify if a user exists with that E-mail
    const user = await User.findOne({email: email});
    if(!email || !password){
        return res.status(401).json({err:"Invalid username or password"});
    }
    //Step3: Verify if the password provided by the user for login is correct
    //This is the tricky part.
    //Direct password comparison will not work. password== user.password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(401).json({err:"Invalid username or password"});
    }

const token=await getToken(email, user);
const userToReturn={...user.toJSON(),token};
delete userToReturn.password;
return res.status(200).json(userToReturn);
});

module.exports = router;