/**
 * @file
 * Includes middleware to ensure that a user is logged in before proceeding.
 * This is used to protect routes that require authentication.
 * @author Cesar H.
 */

exports.ensureUserIsLoggedIn = (req, res, next) => {

    if (!req.session.userID) {
        console.log("Access attempt without login.");
        return res.redirect('/');
    } else {
        next();
    }
};