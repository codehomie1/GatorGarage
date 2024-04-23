const db = require('../conf/database');

module.exports = {
    getPostInfo: async function(req, res, next) {
        try {
            // Prepare the query
            const query = `SELECT itemPost.*, users.username AS sellerName,users.email AS sellerEmail
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
            console.log(post[0]);
            // Return the first item found in the database
            return post[0];
        } catch (error) {
            console.error('Database error:', error);
            // If there's an error, we can either rethrow the error or return `null` or an appropriate error value
            throw error; // This will let the caller handle the error
        }
    },

    getUserPosts: async function(req, res, next) {
        const userId = req.params.userId;

        try {
            // Prepare the query
            const query = `SELECT * FROM csc648_team6DB.itemPost WHERE userId = ? ORDER BY postDate DESC`;

            // Execute the query with the parameterized `userId`
            const [posts] = await db.query(query, [userId]);

            if (posts.length === 0) {
                return res.status(404).send('Posts not found');
            }

            return posts;
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal server error');
        }
    }
};
