const mysql = require("mysql");


export function connectToDatabase(env) {
    const connection = mysql.createConnection(env);
    return connection;
}