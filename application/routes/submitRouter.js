/**
 * @file
 * Sets up an Express router for handling post submission requests.
 * Post info going to the database and user authorization are handled by corresponding middleware.
 * Images are processed and uploaded to server via 'multer' and 'sharp' middleware.
 *
 * @ author Cesar H.
 */

// Dependencies
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { uploadImage, generateAndUploadThumbnail} = require('../controllers/fileUploadController');
const { createPost } = require('../middleware/posts');
const { ensureUserIsLoggedIn } = require('../middleware/authentication');

// POST route for submitting a new post
router.post('/submit', uploadImage.single('image'), ensureUserIsLoggedIn, async (req, res) => {

    // Make sure all required fields are filled out
    if (!req.body.title || !req.body.category || !req.body.price || !req.body.description) {
        return res.status(400).send("All fields must be filled out!\n");
    }

    try {
        // Acquire data from the form and req.body, so we can insert into the database
        const {title, course, category, price, location, description} = req.body;
        const userID = req.session.userID;
        const imagePathForDb = req.body.imagePathForDb; // img/items/timestampedImageName.jpg to store in the database
        const thumbnailPathForDb = req.body.thumbnailPathForDb; // img/thumbnails/timestampedThumbnailName.jpg

        // Check if thumbnail directory exists, create it if it doesn't
        const fileSystemThumbnailDirPath = path.join(path.resolve(__dirname, '..'), 'public', path.dirname(thumbnailPathForDb)); // /path/to/project/public/img/thumbnails
        if (!fs.existsSync(fileSystemThumbnailDirPath)) {
            fs.mkdirSync(fileSystemThumbnailDirPath, {recursive: true});
        }

        // Upload the thumbnail
        const imagePathInFileSystem = path.join(__dirname, '..', 'public', imagePathForDb);
        const thumbnailPathInFileSystem = path.join(__dirname, '..', 'public', thumbnailPathForDb);
        console.log("imagePathInFileSystem:", imagePathInFileSystem);
        console.log("thumbnailPathInFileSystem:", thumbnailPathInFileSystem);
        await generateAndUploadThumbnail(imagePathInFileSystem, thumbnailPathInFileSystem);

        // Update the database with the post information
        await createPost(title, course, category, price, location, description, imagePathForDb, thumbnailPathForDb, userID);
        console.log("Post successful.");
        res.redirect('/dashboard');
    } catch (error) {
        console.error("Error during post submission:", error);
        res.status(500).send("Failed to submit the post. Please try again.");
    }

});

module.exports = router;
