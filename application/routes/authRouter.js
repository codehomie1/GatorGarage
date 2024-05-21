/**
 * @file authRouter.js
 * @description This router handles all authentication-related routes for the application. 
 * It bridges the HTTP interface with the appropriate controller actions, specifically 
 * handling sign-ups, logins, and logouts.
 *
 * This setup ensures that all authentication requests are processed properly and that any 
 * user credentials or session changes follow the designated security practices and business logic.
 *
 * @requires express - Used to create router instances and manage route handlers.
 * @requires userController - A module that contains controller functions for handling user sign-up, login, and logout actions.
 *
 * @route {POST} /signup - Handles user sign-up using the signUp method from userController.
 * @route {POST} /login - Handles user login using the login method from userController.
 * @route {GET} /logout - Handles user logout using the logout method from userController.
 *
 * @author Cesar H. and Jacob G.
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

module.exports = router;