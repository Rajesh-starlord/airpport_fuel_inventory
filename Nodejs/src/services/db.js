const mysql = require('mysql');
const pool = require('../database/mysqlPoolConfig');
const ErrorLogger = require('../database/errorLogger');

const db = {
    execute: query => {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    connection.release();
                    reject(err);
                }
                connection.query(query.text, query.values || [], (err, rows) => {
                    if (err) {
                        reject(ErrorLogger(err));
                    };
                    connection.release();
                    resolve(rows);
                });
            });
        });
    },

    executeUpdate: query => {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    connection.release();
                    reject(err);
                }
                connection.query(query.text, query.values || [], (err, result) => {
                    if (err) {
                        reject(ErrorLogger(err));
                    };
                    connection.release();
                    result && result.affectedRows > 0 ? resolve({ ...result, status: true }) : resolve({ ...result, status: false });
                });
            });
        });
    }
}

module.exports = db;