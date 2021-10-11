const mysql = require('mysql');
const dbConfig = require('../database/mysqlConfig');
const ErrorLogger = require('../database/errorLogger');

const dbService = {
    execute: query => {
        return new Promise((resolve, reject) => {
            let connection = mysql.createConnection(dbConfig);
            try {
                connection.connect((err) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log('Connected to MySQL Server!');
                    }
                });
                connection.query(query.text, query.values || [], (err, rows) => {
                    if (err) {
                        ErrorLogger(err);
                        reject(ErrorLogger(err));
                    };
                    resolve(rows);
                    connection.end();
                });
            } catch (error) {
                console.log(error);
                reject();
            }
        });
    },

    executeUpdate: query => {
        return new Promise((resolve, reject) => {
            let connection = mysql.createConnection(dbConfig);
            try {
                mysql.createConnection(dbConfig).connect((err) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log('Connected to MySQL Server!');
                    }
                });
                connection.query(query.text, query.values || [], (err, result) => {
                    if (err) {
                        ErrorLogger(err);
                        reject(ErrorLogger(err));
                    };
                    resolve(result);
                    connection.end();
                });
            } catch (error) {
                console.log(error);
                reject();
            }
        });
    }
}

module.exports = dbService;