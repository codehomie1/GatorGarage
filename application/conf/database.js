const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 50,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0
}).promise();

module.exports = pool;