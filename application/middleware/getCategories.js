const db = require('../conf/database');

module.exports = {
    getCategories: async function(req,res,next){
        try {
            const query = `SELECT categoryName 
                            FROM csc648_team6DB.categories`;
            const [rows] = await db.query(query);
            const categoryNames = rows.map(category => category.categoryName);
            return categoryNames; // Return the data instead of sending the response
        } catch (error) { 
            console.error(error);
            res.status(500).send('Error fetching categories');
        }
    }
};

