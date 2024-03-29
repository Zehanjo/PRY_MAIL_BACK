const { createPool } = require('mysql2/promise');
require("dotenv").config();

const mysqlEnv = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
}

const mysqlConfig = createPool(mysqlEnv);

module.exports = { mysqlConfig };