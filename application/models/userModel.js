/**
 * @file userModel.js
 * @description Handles operations related to user data management including creating new users
 * and interacting directly with the database. All user-related data logic is encapsulated here.
 *
 * @requires db - The database connection module to perform SQL queries.
 * @requires bcryptjs - Library used for hashing passwords securely.
 *
 * Operations provided:
 * - createUser(firstName, lastName, email, password): Inserts a new user into the database,
 *   hashes the password, and returns the user's new unique ID.
 *
 *   @author Cesar H.
 */

const db = require('../conf/database');
const bcrypt = require('bcryptjs');

/**
 * Creates a new user with the provided details, hashes the password, and inserts into the database.
 * @param {string} firstName - User's first name
 * @param {string} lastName - User's last name
 * @param {string} email - User's email
 * @param {string} password - User's raw password to be hashed
 * @returns {Promise<number>} The new user's ID from the database
 */
async function createUser(firstName, lastName, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const sql = 'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
    await db.query(sql, [firstName, lastName, email, hashedPassword]);
    const [userIDRows,] = await db.query('SELECT LAST_INSERT_ID() AS userID');
    return userIDRows[0].userID;
}

/**
 * Finds a user by their email address.
 * @param {string} email - Email address to search for.
 * @returns {Promise<object|null>} - The user's data as an object or null if not found.
 */
async function findUserByEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = ? LIMIT 1';
    try {
        const [rows] = await db.query(sql, [email]);
        if (rows.length > 0) {
            return rows[0];
        } else {
            return null;
        }
    } catch (err) {
        console.error('Database error while finding user by email:', err);
        throw err;  // Rethrowing the error to be handled by the caller
    }
}

module.exports = {
    createUser,
    findUserByEmail
};
