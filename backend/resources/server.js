/* jshint esversion: 11 */
/* jshint node: true */

"use strict";

const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { verifyLoginCredentials } = require("./AuthenticateLoginCredentials");
const jwtKey = require('./GenerateKey');
const { secretKey } = jwtKey;
const { request, response } = require("express");
const { result } = require("lodash");
const bcrypt = require("bcrypt");
const saltRounds = 13;

console.log(jwtKey);

const generateNewCustomerID = (request, response, next) => {
    connection.query("SELECT COUNT(*) + 1 as newID FROM MILK_CUSTOMERS", (error, result) => {
        try {
            request.customerID = "MT" + "0".repeat(3 - result[0].newID.toString().length) + result[0].newID;
            next();
        } catch (error) {
            throw error;
        }
    });
};

const checkLoginCredentials = (request, response, next) => {
    let {submittedUserID, submittedPassword} = request.body;
    connection.query(`SELECT CustomerID, Password FROM MILK_CUSTOMERS WHERE CustomerID = '${submittedUserID}';`, async (error, result) => {
        try {
            let storedPassword = result[0].Password;
            const passwordMatched = await bcrypt.compare(submittedPassword, storedPassword);
            console.log('passwordMatched = ' + passwordMatched);
            // if (userIDMatched && passwordMatched) {
            if (passwordMatched) {
                request.loginCredentials = result[0];
                // generateToken(result[0]);
                next();
            }
            // else if (result[0] === undefined) {
            else {
                return response.status(401).send({code: 401, message: 'Incorrect Customer ID or Password. Please try again.'});
            }
        } catch (error) {
            console.log(error);
            return response.status(401).send({code: 401, message: 'Incorrect Customer ID or Password. Please try again.'});
            // throw error;
        }
    });
};

// Verify Token
const verifyToken = (request, response, next) => {
    // const bearerHeader = request.headers.authorization;
    const bearerHeader = request.cookies.accessToken;
    // Check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
        // Split at the space
        const [ typeOfToken, token ] = bearerHeader.split(" ");
        if (typeOfToken === "Bearer" && typeof token !== "undefined") {
            try {
                let payload = jwt.verify(token, secretKey);
                next();
            } catch (error) {
                console.log(error);
                response.status(401).send({code: 123, message: "Invalid or Expired Token."});
            }
        }
    } else {
        // Forbidden
        console.log("Forbidden");
        response.sendStatus(403);
    }
};

const app = express();
app.use(cookieParser());
app.use(express.json());
// app.use(cors());
app.use(cors({credentials: true, origin: "http://localhost:3000"}));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tanmaysql",
    database: "mydb"
});

connection.connect(error => {
    if (error) throw error;
    console.log("You are now connected with mysql database...");
});

app.get("/", (request, response) => response.send("Welcome to Milk Request Express API"));

app.get("/old", (request, response) => response.redirect(301, "new"));

app.get("/new", (request, response) => response.send("<h2>Redirected from old to new</h2>"));

app.post("/api/milk/register", generateNewCustomerID, async (request, response) => {
    const {customerName, customerEmailID, customerContactNumber, customerAddress, customerPincode, customerPassword} = request.body;
    let passHash = await bcrypt.hash(customerPassword, saltRounds);
    let registrationQuery = `INSERT INTO MILK_CUSTOMERS (CustomerID, CustomerName, Address, PINCODE, ContactNumber, EmailID, Password) VALUES (
        '${request.customerID}',
        '${customerName}',
        '${customerAddress}',
        '${customerPincode}',
        '${customerContactNumber}',
        '${customerEmailID}',
        '${passHash}'
    );`;
    connection.query(registrationQuery, (error, result) => {
        try {
            // result.id = request.customerID;
            console.log(result);
            response.status(201).json({
                customerID: request.customerID
            });
        } catch (error) {
            throw error;
        }
    });
});

app.post("/api/milk/authenticateDetail", (request, response) => {
    const detail = Object.keys(request.body)[0];
    connection.query(`SELECT ${detail} FROM MILK_CUSTOMERS WHERE ${detail} = '${Object.values(request.body)[0]}';`, (error, result) => {
        try {
            console.log(result[0]);
            result[0] ? response.send(result[0]) : response.send({ emailID: '' });
        } catch (error) {
            throw error;
        }
    });
});

app.post("/api/milk/login", checkLoginCredentials, (request, response) => {
    // jwt.sign(payload={userCredentials: request.loginCredentials}, secretOrPrivateKey=jwtKey, options={expiresIn: "30s"}, callback=(error, token) => {
    jwt.sign({userCredentials: request.loginCredentials}, secretKey, {expiresIn: "86400s"}, (error, token) => {
    // Token expires after 1 day
        try {
            response
                .status(201)
                .cookie("accessToken", "Bearer " + token, {
                    path: "/",
                    httpOnly: true,
                    maxAge: 24 * 3600 * 1000
                })
                .send("Token generated.");
        } catch (error) {
            console.log(error);
        }
    });
});

// End-Point For getting Total volume of Milk ordered in a month
app.get("/api/milk/orders/:customerID/:month/:year", (request, response) => {
    const { customerID, month, year } = request.params;
    let queryString = "SELECT sum(QuantityOfMilk) as totalVolumeInAMonth FROM milk_requests WHERE CustomerID = '" + customerID + "' and month(RequestTimeStamp) = '" + month + "' and year(RequestTimeStamp) = " + year + ";";
    
    connection.query(queryString, (error, result) => {
        if (error) throw error;
        const totalQuantityOfMilk = result[0].totalVolumeInAMonth !== null ? result[0].totalVolumeInAMonth.toString() : "0";
        response.status(200).send(totalQuantityOfMilk.toString());
    });
});

// End-Point For Placing Order
app.post("/api/milk/orders/", verifyToken, (request, response) => {
    console.log(request.cookies);
    let currentDate = new Date();
    currentDate = currentDate.toISOString().substring(0, 10) + currentDate.toString().substring(15, 24);
    const orderData = request.body;
    const query = "INSERT INTO milk_requests (CustomerID, RequestTimeStamp, QuantityOfMilk) VALUES ('" + 
    orderData.customerID + "', '" + currentDate + "', '" + orderData.quantity + "');";
    connection.query(query, (err, result) => {
        if (err) throw err;
        response
            .status(201)
            .send({
                message: "Order Placed Successfully!"
            });
    });
});

const server = app.listen(process.env.PORT || 3001, (error) => {
    try {
        const host = server.address().address;
        const port = server.address().port;
        console.log(`App listening at https://${host}:${port}`);
    } catch (error) {
        console.log(error);
        throw error;
    }
});