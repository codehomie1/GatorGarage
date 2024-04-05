const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const aboutRouter = require('./routes/aboutRouter');
const pool = require('./conf/database')
const search = require('./middleware/search');
const getCategoriesModule = require('./middleware/getCategories.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res, next) => {
    console.log("/");
    try {
        const categories = await getCategoriesModule.getCategories(req, res, next);
        res.render('index', {categories: categories});
    } catch (error) { 
        console.error(error);
        res.status(500).send('Error fetching categories');
    }
});


app.get('/search', search.searchItems, async function (req, res) {
    const searchQuery = req.query.query || ''; // Fallback to an empty string if no keywords are provided
    const items = res.locals.items || []; // Fallback to an empty array if no items are set by the middleware
    const categories = await getCategoriesModule.getCategories(req, res);
    // Render the 'search' view with necessary data
    res.render('search', {
        items: items,
        searchQuery: searchQuery, // Pass the search query for display
        totalResults: items.length, // Pass the total number of results found
        categories: categories // Pass the categories for nav.ejs
    });
});

app.get('/members', function(req, res) {
    console.log("Members");
    const teamInfo = require('./teamData');
    res.render('member', { teamInfo: teamInfo });
});

// Use the aboutRouter for the /about endpoint
app.use('/about', aboutRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



