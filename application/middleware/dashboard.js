const db = require('../conf/database');

module.exports = {
    fetchUserInfo: async function(userID, req, res, next){
        try{
            // prepared statement
            const query = `SELECT firstName, lastName, email, bio
            FROM csc648_team6DB.users
            WHERE userId = ?;
            `;

            const [data] = await db.query(query, [userID]);

            // if (data.length === 0){
            //     return res.status(404).send('Posts not found');
            // }

            return data; // return to router
        } catch (error){
            console.log(error);
            throw(error);
        }
    }
}
