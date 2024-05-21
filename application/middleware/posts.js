/**
 * Posts Middleware - Gator Garage Web Application
 *
 * This module provides middleware functions to interact with post-related data within the platform. It supports:
 * - getPostInfo: Retrieves detailed information about a specific post including the associated seller details.
 * - getUserPosts: Fetches all posts made by a specific user, sorted by post date in descending order.
 * - createPost: Inserts user created post into database.
 */

const db = require('../conf/database');

module.exports = {
    getPostInfo: async function(req, res, next) {
        try {
            // Prepare the query
            const query = `SELECT itemPost.*, users.firstName AS sellerName,users.email AS sellerEmail
            FROM csc648_team6DB.itemPost
            INNER JOIN csc648_team6DB.users ON itemPost.userId = users.userId
            WHERE itemPost.postId = ?
            `;

            var value = req.params.postId
            const [post] = await db.query(query, [value]);

            if ([post].length === 0) {
                // Return `null` when no item is found
                return null;
            }
            //console.log(post[0]);
            // Return the first item found in the database
            return post[0];
        } catch (error) {
            console.error('Database error:', error);
            // If there's an error, we can either rethrow the error or return `null` or an appropriate error value
            throw error; // This will let the caller handle the error
        }
    },
    getUserPosts: async function(userID, req, res, next) {
        try {
            // Prepare the query
            const query = `SELECT * FROM csc648_team6DB.itemPost WHERE userId = ? ORDER BY postDate DESC`;

            // Execute the query with the parameterized `userId`
            var value = `${userID}`
            const [posts] = await db.query(query, value);

            // if (posts.length === 0) {
            //     return res.status(404).send('Posts not found');
            // }
            //console.log(posts);
            console.log("--------inside getUserPosts--------------");
            return posts;
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal server error');
        }
    },
    createPost: async function(title, course, category, price, location, description, image, thumbnail, userID, req, res, next){
        try{
            // Send data to database
            let values = [];
            const itemPrice = parseFloat(price);

            // Check if course is provided
            if (!course){
                // If no course provided
                const query = `
                INSERT INTO csc648_team6DB.itemPost (itemName, itemPrice, itemPicture, itemThumbnail, itemDescription, userId, location, categoryId)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);
                `;
    
                values = [`${title}`, itemPrice, image, thumbnail, `${description}`, userID, `${location}`, category];
    
                await db.query(query, values);
            }
            else{
                // If course is provided
                const query = `
                INSERT INTO csc648_team6DB.itemPost (itemName, itemPrice, itemPicture, itemThumbnail, itemDescription, userId, location, course, categoryId)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
                `;
        
                values = [`${title}`, itemPrice, image, thumbnail, `${description}`, userID, `${location}`, `${course}`, category];
        
                await db.query(query, values);
            }
            
            // Return resolved promise if insert is successful
            return Promise.resolve();
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    },
    deletePost: async function(postID, req, res, next){
        try{
            if (!postID){
                return res.status(404).send('No postID');
            }
            const query = `DELETE FROM csc648_team6DB.itemPost WHERE postID = ?;`
            await db.query(query, postID);

            return Promise.resolve();
        } catch (error){
            console.error(error);
            return Promise.reject(error);
        }
    },
    updatePost: async function(title, course, category, price, location, description, postID, req, res, next){
        try{
            if (!postID){
                return res.status(404).send('No postID');
            }

            const query = `UPDATE csc648_team6DB.itemPost 
            SET itemName = ?, 
                itemPrice = ?, 
                itemDescription = ?, 
                location = ?, 
                courseId = ?, 
                categoryId = ?, 
            WHERE postID = ?;
            `;

            const itemPrice = parseFloat(price);

            values = [`${title}`, itemPrice, `${description}`, `${location}`, `${course}`, category, postID];

            await db.query(query, values);

            return Promise.resolve();
        } catch (error){
            console.error(error);
            return res.status(404).send('Error updating post');
        }
    }
};
