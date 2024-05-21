/**
 * @file userController.js
 * @description Contains controller functions for user-related actions within the application,
 * managing business logic that bridges data handling (Model) and the user interface (View).
 * This includes registering users, logging in/out, and managing user sessions.
 *
 * Responsibilities:
 * - Managing user authentication processes.
 * - Validating user inputs.
 * - Session initialization and destruction.
 * - Redirecting users based on their authentication status.
 *
 * @requires userModel - to interact with the User database.
 * @requires bcrypt - for password hashing comparison.
 * @author Jacob G., Cesar H.
 */

const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

/**
 * Handles the user registration process, including input validation, user creation in the
 * database, session initialization, and redirecting to the dashboard upon successful registration.
 *
 * @param {object} req - The HTTP request object from Express.js.
 * @param {object} res - The HTTP response object from Express.js.
 * @returns {Promise<void>} - Asynchronously handles the request without returning a value, using res to send the HTTP response.
 */
async function signUp(req, res) {
    const {firstName, lastName, email, password} = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).send("All fields are required");
    }

    try {
        // Check if the email already exists in the database
        const existingUser = await userModel.findUserByEmail(email);

        if (existingUser) {
            // Handle scenario where email is already in use
            return res.status(400).json({error: "This email is already registered. Please log in or recover your password if you've forgotten it."});
        }

        // Create a new user if the email is not already registered
        const userID = await userModel.createUser(firstName, lastName, email, password);
        req.session.userID = userID;
        req.session.isLoggedIn = true;
        res.redirect('/dashboard');
    } catch (err) {
        console.error('Error in signup process:', err);
        res.status(500).send('Database error');
    }
}

/**
 * Handles the user login process, including input validation, user authentication, session
 * initialization, and redirecting to the dashboard upon successful login.
 *
 * @param {object} req - The HTTP request object from Express.js.
 * @param {object} res - The HTTP response object from Express.js.
 * @returns {Promise<void>} - Asynchronously handles the request without returning a value, using res to send the HTTP response.
 */
async function login(req, res) {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).send("all fields are required");
    }

    try {
        const user = await userModel.findUserByEmail(email);

        if (user && await bcrypt.compare(password, user.password)) {
            req.session.userID = user.userId;
            console.log("UserID set in session:", req.session.userID); // Add this line for debugging
            req.session.isLoggedIn = true;
            res.redirect('/dashboard');
        } else {
            return res.status(401).json({error: "Invalid email or password. Please try again."});
        }
    } catch (err) {
        console.error('Error in login process:', err);
        res.status(500).json({error: 'Database error. Please try again later.'});
    }
}

/**
 * Handles the user logout process by destroying the current user session and redirecting
 * the user to the homepage.
 *
 * @param {object} req - The HTTP request object from Express.js.
 * @param {object} res - The HTTP response object from Express.js.
 * @returns {void} - Immediately handles the logout process without awaiting further processes.
 */
async function logout(req, res) {
    req.session.destroy(err => {
        if (err) {
            console.error('Logout error:', err);
            res.status(500).send('Failed to log out');
        } else {
            if (req.cookies.sessionCookieName) {
                res.clearCookie('sessionCookieName');
            }
            res.redirect('/');
        }
    });
}

module.exports = {
    signUp,
    login,
    logout
};
