const asyncHandler = require("express-async-handler")
const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {

    const {username, email, password} = req.body;
    if(!username || !password || !email){
        res.status(400);
        throw new Error("All fields are required");
    }

    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400);
        throw new Error("Email already exists");
    }
    //hashing of password
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("Hashed password : ", hashedPassword);
    const user  = await User.create({
        username,
        email,
        password: hashedPassword,  //hashed password stored in database
    })

    console.log("user created : ", user);
    if(user){
        res.status(201).json({ _id:user.id, email: user.email });
    } else{
        throw new Error("User invalid"); 
    }
    res.json({ message: "registered successfully" });
});

const loginUser = asyncHandler(async(req, res) => {

    const { email, password} = req.body;
    if(!email ||!password){
        res.status(400);
        throw new Error("All fields are required");
    }

    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = await jwt.sign({
            user:{
                username : user.username,
                email : user.email,
                id : user.id,
            },

        }, process.env.ACCESS_TOKEN, {expiresIn: "15m"}); 
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Invalid email or password");  // or throw a custom error message for security reasons. 401 Unauthorized. 400 Bad Request. 403 Forbidden. 500 Server Error. 503 Service Unavailable. 404 Not Found. 200 OK. 201 Created. 202 Accepted. 204 No Content. 301 Moved Permanently. 304 Not Modified. 307 Temporary Redirect. 410 Gone. 418 I'm a Teapot. 429 Too Many Requests. 501 Not Implemented. 502 Bad Gateway. 504 Gateway Timeout. 511 Network Authentication Required. 200 OK. 201 Created. 202 Accepted. 204 No
    }
});

const currentUser = asyncHandler((req, res) => {
    res.json(req.user);
})

module.exports = {registerUser, loginUser, currentUser};