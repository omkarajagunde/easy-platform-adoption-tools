/*
 * Licensed Materials - Property of IBM
 *
 * (C) Copyright IBM Corp. 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication, or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 **/

const database = require("mongoose");


var mongoOptions = {
    bufferCommands: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
// DB CONNECTIONS
const connectToDb = () => {
    database.connect(process.env.MONGODB_URL, mongoOptions, () => console.info("connected to db..."));
    database.connection.on("connected", function () {
        console.info("Mongoose successfully connected with mongodb");
    });
  
    database.connection.on("error", function (err) {
        console.error("Mongoose default connection has occured error : " + err);
    });

    database.connection.on("disconnected", function () {
        console.info("Mongoose default connection is disconnected");
    });
}
module.exports = { connectToDb }