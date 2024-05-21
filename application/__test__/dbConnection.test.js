require('dotenv').config();
const mysql = require('mysql');

// Configuration for your database using environment variables
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

// A function to establish a connection to the MySQL database
const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(dbConfig);
    connection.connect(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve('Successfully connected to the database');
      connection.end();
    });
  });
};

// Jest test case
describe('MySQL Connection Test', () => {
  test('should connect to MySQL database without error', async () => {
    await expect(connectToDatabase()).resolves.toEqual('Successfully connected to the database');
  });
});
