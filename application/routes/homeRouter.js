/**
 * Home Routes
 *
 * Routes for handling the home page of the application. This module sets up the
 * main route '/' and integrates middleware for fetching recent posts and categories
 * with pictures. It renders the homepage with the necessary view and data.
 *
 * @module homeRoutes
 *
 * Dependencies:
 *  - express: Framework for handling the server.
 *  - search: Middleware for getting recent posts from the blog.
 *  - getCategoriesModule: Middleware to fetch categories with associated pictures.
 *
 * Route Definitions:
 *  - GET '/': Renders the homepage with recent posts and categories.
 *    Uses `search.getRecentPosts` to fetch posts and `getCategoriesModule.getCategoriesWithPictures`
 *    to fetch categories tailored to meet user experience requirements.
 *
 */

// Import express and other necessary modules
const express = require('express');
const router = express.Router();

// Import middleware
const search = require('../middleware/search');
const getCategoriesModule = require('../middleware/getCategories.js');

// Define the '/' GET route
router.get('/', search.getRecentPosts, async (req, res, next) => {
    try {
        const categories = await getCategoriesModule.getCategoriesWithPictures(req, res, next);
        const recentPosts = res.locals.recentPosts || [];
        res.render('index', {
            categories: categories,
            recentPosts: recentPosts
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching categories');
    }
});

// Export the router for use in the main application
module.exports = router;
