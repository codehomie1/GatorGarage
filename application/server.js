/**
 * Express Server Configuration and API Routing
 *
 * This JavaScript file configures an Express.js web server and defines various API endpoints to handle different functionalities of the web application.
 * This setup includes middleware for message handling, category and post management, and rendering views using EJS templates.
 * The server uses environment variables for configuration settings and static files serving.
 *
 * @requires dotenv - Manages environment configurations.
 * @requires express - Framework for handling and routing HTTP requests.
 * @requires ./routes/aboutRouter - Routes for about page information.
 * @requires ./middleware/messages - Middleware for messaging functionalities.
 * @requires ./middleware/search - Middleware for search operations.
 * @requires ./middleware/getCategories - Middleware for fetching category-related data.
 * @requires ./middleware/posts - Middleware for operations related to posts.
 *
 * @fileoverview - Application initialization and routing logic are set here where:
 *                 - Different page routes render specific views.
 *                 - Middleware is used for processing requests like searching and messaging.
 *                 - Error handling and server responses are managed extensively across various routes.
 */

const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const aboutRouter = require('./routes/aboutRouter');
const {getMessageDetails, messageUser} = require('./middleware/messages.js')
const search = require('./middleware/search');
const getCategoriesModule = require('./middleware/getCategories.js');
const posts = require('./middleware/posts.js')

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res, next) => {
    try {
        const categories = await getCategoriesModule.getCategoriesWithPictures(req, res, next);
        res.render('index', {categories: categories});
    } catch (error) { 
        console.error(error);
        res.status(500).send('Error fetching categories');
    }
});


app.get('/dashboard', async (req,res,next) => {
    const categories = await getCategoriesModule.getCategoriesWithPictures(req, res, next);
    res.render('dashboard', {categories: categories});
});

app.get('/createpost', async (req,res,next) => {
    const categories = await getCategoriesModule.getCategories(req, res);
    res.render('createpost', { categories });
})

app.get('/search', search.searchItems, async function (req, res) {
    const searchQuery = req.query.query || ''; // Fallback to an empty string if no keywords are provided
    const items = res.locals.items || []; // Fallback to an empty array if no items are set by the middleware
    const categories = await getCategoriesModule.getCategories(req, res);
    const currentCategory = req.query.category || '';

    // Render the 'search' view with necessary data
    res.render('search', {
        items: items,
        searchQuery: searchQuery, // Pass the search query for display
        totalResults: items.length, // Pass the total number of results found
        categories: categories, // Pass the categories for nav.ejs
        currentCategory: currentCategory // Pass the current category name for category search filter
    });
});

app.get('/members', function(req, res) {
    console.log("Members");
    const teamInfo = require('./teamData');
    res.render('member', { teamInfo: teamInfo });
});

app.use('/about', aboutRouter);

app.get('/item-details/:postId', async (req, res, next) => {
    try {
        console.log(req.params.postId);
        const post = await posts.getPostInfo(req, res, next);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        const categories = await getCategoriesModule.getCategories(req, res, next);
        res.render('itemDetails', {categories: categories, post: post});
    } catch (error) { 
        console.error(error);
        res.status(500).send('Error fetching categories');
    }
});

app.get('/message/:postId', messageUser, async (req, res, next) => {
    try {
        const postId = req.params.postId;
        // Fetch post details
        const postDetails = await posts.getPostInfo(req, res, next);
        // console.log(postDetails);
        // If no post details found, send 404 response
        if (!postDetails) {
            if (!res.headersSent) {
                return res.status(404).send('Item not found');
            }
        }
        // Send postDetails as JSON data
        res.json(postDetails);
    } catch (error) {
        console.error(error);
        // Make sure to check if the headers have already been sent
        if (!res.headersSent) {
            res.status(500).send('Error fetching message');
        }
    }
});




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



