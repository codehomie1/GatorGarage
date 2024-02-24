// Import required modules
// Define route handler for the /about endpoint
const express = require('express');
const teamInfo = require('../public/js/teamData');

// Create a new router instance
const aboutRouter = express.Router();


aboutRouter.get('/', (req, res) => {
    res.render('about', {teamInfo}); 
});

aboutRouter.get('/1', (req, res) => {
    res.render('member', { data: teamInfo[0] }); 
});

aboutRouter.get('/2', (req, res) => {
    res.render('member', {data: teamInfo[1]}); 
});

aboutRouter.get('/3', (req, res) => {
    res.render('member', {data: teamInfo[2]}); 
});

aboutRouter.get('/4', (req, res) => {
    res.render('member', {data: teamInfo[3]}); 
});

aboutRouter.get('/5', (req, res) => {
    res.render('member', {data: teamInfo[4]}); 
});

aboutRouter.get('/6', (req, res) => {
    res.render('member', {data: teamInfo[5]}); 
});


module.exports = aboutRouter;
