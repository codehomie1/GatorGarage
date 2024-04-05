// Import required modules
const express = require('express');
const teamInfo = require('../public/js/teamData');
const { getCategories } = require('../middleware/getCategories.js');

// Create a new router instance
const aboutRouter = express.Router();

// Middleware to fetch categories and attach them to the request object
aboutRouter.use(async (req, res, next) => {
    try {
        const categories = await getCategories();
        req.categories = categories; // Attach categories to request object
        next();
    } catch (error) {
        console.error(`Error fetching categories in aboutRouter middleware: ${error.message}`);
        next(error);
    }
});

// Route handlers
aboutRouter.get('/', (req, res) => {
    res.render('about', {teamInfo, categories: req.categories});
});

aboutRouter.get('/1', (req, res) => {
    res.render('member', { data: teamInfo[0], categories: req.categories });
});

aboutRouter.get('/2', (req, res) => {
    res.render('member', {data: teamInfo[1], categories: req.categories});
});

aboutRouter.get('/3', (req, res) => {
    res.render('member', {data: teamInfo[2], categories: req.categories});
});

aboutRouter.get('/4', (req, res) => {
    res.render('member', {data: teamInfo[3], categories: req.categories});
});

aboutRouter.get('/5', (req, res) => {
    res.render('member', {data: teamInfo[4], categories: req.categories});
});

aboutRouter.get('/6', (req, res) => {
    res.render('member', {data: teamInfo[5], categories: req.categories});
});


module.exports = aboutRouter;
