/* jshint esversion: 11 */

const { dev } = require("./dbConfig.json");
import { connectToDatabase } from "./connect-to-database.js";


export function executeSqlQuery(sqlQuery) {
    const connection = connectToDatabase(dev);
    let queryResult;
    return new Promise((resolve, reject) => {
        connection.connect((error) => {
            if (error) {
                console.error("Failed to connect to the database", error);
                reject(error);
                throw error;
            }
            console.log("Successfully connected to the database");
            connection.query(sqlQuery, (error, result) => {
                if (error) {
                    console.error("Failed to execute the SQL query", error);
                    connection.end();
                    reject(error);
                    throw error;
                }
                console.log("Successfully executed the SQL query", result);
                connection.end((error) => {
                    if (error) {
                        console.error("Failed to close the connection to the database", error);
                        reject(error);
                        throw error;
                    }
                    console.log("Successfully closed the connection to the database");
                    resolve(result);
                });
                queryResult = result;
            });
        });
        return queryResult;
    });
}