const db = require('../conf/database');

module.exports = {
<<<<<<< HEAD
    // This function returns an array of objects with category.categoryName
    // This function is used in the navbar to fetch only category names
=======
>>>>>>> 8ed4f1b8e01ff78223fb3388ffe846caa72d14f3
    getCategories: async function(req,res,next){
        try {
            const query = `SELECT categoryName 
                            FROM csc648_team6DB.categories`;
            const [rows] = await db.query(query);
<<<<<<< HEAD
            return rows; // Return category.categoryName
=======
            const categoryNames = rows.map(category => category.categoryName);
            return categoryNames; // Return the data instead of sending the response
>>>>>>> 8ed4f1b8e01ff78223fb3388ffe846caa72d14f3
        } catch (error) { 
            console.error(error);
            res.status(500).send('Error fetching categories');
        }
<<<<<<< HEAD
    },

    // This function returns an array of objects with category.categoryName and category.categoryPicture
    // This function is used to fetch categories with pictures for category display on the homepage
    getCategoriesWithPictures: async function(req,res,next){
        try {
            const query = `SELECT categoryName, categoryPicture 
                            FROM csc648_team6DB.categories`;
            const [rows] = await db.query(query);
            return rows; // Return an array of objects with category.categoryName and category.categoryPicture
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching categories');
        }

=======
>>>>>>> 8ed4f1b8e01ff78223fb3388ffe846caa72d14f3
    }
};
