const mongoose = require("mongoose");
// const dotenv = require('dotenv').config();

const connectDb = async () => {
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connection established", connect.connection.host, connect.connection.name);
    }catch(e){
        console.error(`Error connecting to MongoDB: ${e.message}`);
        process.exit(1);
    }
};

module.exports = connectDb;