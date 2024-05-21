/**
 * Express Server Configuration and API Routing
 *
 * This JavaScript file configures an Express.js web server and defines various API endpoints to handle different functionalities of the web application.
 * This setup includes middleware for message handling, category and post management, and rendering views using EJS templates.
 * The server uses environment variables for configuration settings and static files serving.
 *
 * @requires dotenv - Manages environment configurations.
 * @requires express - Framework for handling and routing HTTP requests.
 * @requires session - Middleware used to store and manage user - specific data.
 * @requires multer - Middleware used for file uploads.
 * @requires sharp - Library for generating thumbnails for item pictures
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

// TODO: figure out how to organize this section
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const fs = require('fs');
const {getUserMessages, messageUser, sendMessage, deleteMessage} = require('./middleware/messages.js')
const search = require('./middleware/search');
const getCategoriesModule = require('./middleware/getCategories.js');
const {getUserPosts, getPostInfo, deletePost} = require('./middleware/posts.js')
const dashboard = require('./middleware/dashboard.js');
const bodyParser = require('body-parser');
const {ensureUserIsLoggedIn} = require("./middleware/authentication");
// END section

const express = require('express');
const app = express();

// Set up port
const PORT = process.env.PORT || 3000;

// Middleware

// Sessions
const session = require('express-session');
app.use(session({
    secret: 'super_secret_key',
    resave: false,
    saveUninitialized: true
}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());
// End Sessions


app.use((req, res, next) => {
    res.locals.session = req.session; // Makes session data available under 'session' in EJS views
    res.locals.url = req.url; // Makes the URL available under 'url' in EJS views (for button highlighting based on active page)
    next();
});


// Middleware to parse URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'items')));

// Routes
// TODO / in-progress: Refactor the routes to use separate modules
const homeRouter = require('./routes/homeRouter');
app.use('/', homeRouter);

const aboutRouter = require('./routes/aboutRouter');
app.use('/about', aboutRouter);

const authRouter = require('./routes/authRouter');
app.use('/auth', authRouter);

const searchRouter = require('./routes/searchRouter');
app.use('/search', searchRouter);

const submitRouter = require('./routes/submitRouter');
app.use(submitRouter);
// End of route refactoring


app.get('/dashboard', ensureUserIsLoggedIn,  async (req,res,next) => {
    const userID = req.session.userID;
    const messages = await getUserMessages(userID, req, res, next);
    const posts = await getUserPosts(userID, req, res, next); 
    const categories = await getCategoriesModule.getCategoriesWithPictures(req, res, next);

    dashboard.fetchUserInfo(userID, req, res)
    .then((userInfoArray) => { 
        const userInfo = userInfoArray[0];
        const firstName = userInfo.firstName;
        const lastName = userInfo.lastName;
        const email = userInfo.email;
        const bio = userInfo.bio;
        // need to fetch messages / posts
        console.log("dashboard get router");
        console.log("---------messages start-----------");
        //console.log(messages);
        console.log("----------messages end -------------");
        console.log("---------posts start-----------");
        //console.log(posts);
        console.log("--------posts end---------------");
        res.render('dashboard', {categories: categories, messages: messages, posts: posts, firstName: firstName, lastName: lastName, email: email, bio: bio });
    })
    .catch((error) => {
        console.error("Error submitting form: ", error);
        res.status(500).send("Internal server error");
    });
});


app.get('/createpost', async (req,res,next) => {
    res.render('createpost');
})


app.get('/members', function(req, res) {
    console.log("Members");
    const teamInfo = require('./teamData');
    res.render('member', { teamInfo: teamInfo });
});

app.get('/message/:postId', messageUser, async (req, res, next) => {
    try {
        // Fetch post details
        const postDetails = await getPostInfo(req, res, next);
        // console.log(postDetails);

        // If no post details found, send 404 response
        if (!postDetails) {
            if (!res.headersSent) {
                return res.status(404).send('Item not found');
            }
        } 

        // Send postDetails as JSON data
        res.json({ postDetails});
    } catch (error) {
        console.error(error);
        // Make sure to check if the headers have already been sent
        if (!res.headersSent) {
            res.status(500).send('Error fetching message');
        }
    }
});

app.post('/send-message', ensureUserIsLoggedIn, async (req, res, next) => {
    // process passed in info and send to sendMessage
    const messageData = req.body;

    if (!messageData){
        res.status(404).send('Error fetching messageData');
    }

    // access messageData properties like senderId, recipientId, content, postId
    const senderId = req.session.userID; // Grab senderID from session data 
    const recipientId = messageData.recipientId;
    const content = messageData.content;
    const postId = messageData.postId;

    sendMessage(recipientId, senderId, content, postId)
    .then(() => {
        console.log("Message Sent!");
        res.status(200).send('Message sent successfully'); // return OK status to ejs script
    })
    .catch((error) => {
        console.error("Error sending message: ", error);
        res.status(500).send("Internal server error");
    });

})

app.delete('/delete-post/:id', async (req, res) => {
    const postId = req.params.id;

    try{
        // retrieve post info before deletion to delete pictures
        await deletePost(postId);
        res.status(200).send('Post deleted successfully');
    } catch (error){
        console.log('Error deleting post:', error);
        res.status(500).send('Failed to delete post');
    }
});

app.delete('/delete-message/:id', async (req, res) => {
    const msgId = req.params.id;

    try{
        console.log('in delete-msg');
        console.log(msgId);

        await deleteMessage(msgId);
        res.status(200).send('Message deleted successfully');
    } catch (error){
        console.log('Error deleting post:', error);
        res.status(500).send('Failed to delete post');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



