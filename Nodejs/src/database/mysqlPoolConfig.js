require('dotenv').config();
var mysql = require('mysql');
const dbConfig = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME
};

var pool = mysql.createPool(dbConfig);
module.exports = pool;