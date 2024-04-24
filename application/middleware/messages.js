/**
 * Messages Middleware - Gator Garage Web Application
 *
 * This module defines middleware functions to manage user messages within the platform. It provides functions for:
 * - getUserMessages: Retrieves all messages received by a user, joined with itemPost data for context.
 * - getMessageDetails: Fetches details of an individual message including info about the related item and users involved.
 * - messageUser: Attaches item and user details to the response object for messaging context, aiding in constructing user messages.
 */

const db = require('../conf/database');

module.exports = {
    getUserMessages: async function(req,res,next){ // use for obtaining all messages sent by a single user
        try {
            // assuming userId is a URL param
            const userId = req.params.userId;

            const query = `SELECT csc648_team6DB.messages.*, csc648_team6DB.itemPost.itemName AS itemName
            FROM csc648_team6DB.messages
            INNER JOIN csc648_team6DB.itemPost ON csc648_team6DB.messages.postId = csc648_team6DB.itemPost.postId
            WHERE csc648_team6DB.messages.recipientId = ?
            ORDER BY csc648_team6DB.messages.sendTime DESC`;
            var value = `%${userId}%`
            const [messages] = await db.query(query, value);

            // if user has no messages in DB
            if (messages.length === 0){
                return res.status(404).send('Messages not found');
            }
            return messages; // Return array of messages
        } catch (error) { 
            console.error(error);
            res.status(500).send('Internal server error');
        }
    },
    getMessageDetails: async function(req,res,next){ // Use for pulling individual message details
        try{
            // assuming messageId is a URL param
            const messageId = req.params.messageId;

            const query = `SELECT csc648_team6DB.messages.*,
                        csc648_team6DB.itemPost.itemName AS itemName,
                        csc648_team6DB.itemPost.itemDescription AS itemDescription,
                        users.userName AS sellerName,
                        users.email AS userMail
                FROM csc648_team6DB.messages
                INNER JOIN csc648_team6DB.itemPost ON csc648_team6DB.messages.postId = csc648_team6DB.itemPost.postId
                INNER JOIN csc648_team6DB.users ON csc648_team6DB.itemPost.userId = csc648_team6DB.users.userId  
                WHERE csc648_team6DB.messages.messageId = ?`;
            var [message] = await db.query(query, [messageId]);

            // If message does not exist in DB
            if (message.length === 0){
                return res.status(404).send('Message not found');
            }
            else {
            const returnMessage = message[0];
            res.locals.message = returnMessage;
            next();
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    },
    messageUser: async function (req, res, next){ // Use for providing context for message
        try{
            const postId = req.params.postId;

            const query = `SELECT csc648_team6DB.itemPost.*,
                            csc648_team6DB.users.username AS sellerName,
                            csc648_team6DB.users.email AS sellerEmail
                    FROM csc648_team6DB.itemPost
                    INNER JOIN csc648_team6DB.users ON csc648_team6DB.itemPost.userId = csc648_team6DB.users.userId
                    WHERE csc648_team6DB.itemPost.postId = ?`
            var [messageDetails] = await db.query(query, [postId]);
            
            if (messageDetails.length === 0){
                return res.status(404).send("Error fetching item details");
            }
            else{
                const result = messageDetails[0]
                console.log(result)
                res.locals.postDetails = result;
                next();
            }   
        } catch (error){
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }
};

