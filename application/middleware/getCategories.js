/**
 * Get Categories Middleware - Gator Garage Web Application
 *
 * This module provides middleware functions to fetch category information from the database. It includes:
 * - getCategories: Retrieves category names for use in the navigation bar.
 * - getCategoriesWithPictures: Retrieves category names and pictures for display on the homepage.
 */

const db = require('../conf/database');

module.exports = {
    // This function returns an array of objects with category.categoryName
    // This function is used in the navbar to fetch only category names
    getCategories: async function(req,res,next){
        try {
            const query = `SELECT categoryName 
                            FROM csc648_team6DB.categories`;
            const [rows] = await db.query(query);
            return rows; // Return category.categoryName
        } catch (error) { 
            console.error(error);
            res.status(500).send('Error fetching categories');
        }
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

    }
};
