/**
 * Search Middleware - Gator Garage Web Application
 *
 * This module implements a middleware function to handle item searching based on a query and optionally filtered by category.
 * It supports:
 * - searchItems: Processes search queries to fetch matching items from the database, including adjustments for category selection,
 *   and handles edge cases such as empty results or generalized searches.
 * - getRecentPosts: Retrieves the most recently added items from the database, limited to the last 9 entries.
 * - This module is used in the searchRouter.js route to handle search functionality.
 *  It is responsible for fetching items based on search criteria and recent posts for the home page.
 *
 * @module searchMiddleware
 */

const db = require("../conf/database");

module.exports = {
  searchItems: async function (req, res, next) {
    try {
      const searchQuery = req.query.query || "";
      let selectedCategory = req.query.category || "";

      if (selectedCategory === "" || selectedCategory.toLowerCase() === "all") {
        selectedCategory = null;
      }

      var query;
      var values = [];

      // Build the query based on search criteria
      if (!searchQuery && !selectedCategory) {
        query = `SELECT itemPost.*, categories.categoryName AS category, users.username AS sellerName, users.email AS sellerEmail
        FROM csc648_team6DB.itemPost
        INNER JOIN csc648_team6DB.categories ON itemPost.categoryId = categories.categoryId
        INNER JOIN csc648_team6DB.users ON itemPost.userId = users.userId
        WHERE itemPost.isSold = 0 AND itemPost.isAuthorized = 1`;
      } else {
        const whereClauses = [
          `itemPost.isSold = 0`,
          `itemPost.isAuthorized = 1`,
          ...(searchQuery
            ? [`(itemPost.itemName LIKE ? OR itemPost.itemDescription LIKE ?)`]
            : []),
          ...(selectedCategory ? [`categories.categoryName = ?`] : []),
        ];
        query = `
          SELECT itemPost.*, categories.categoryName AS category, users.username AS sellerName, users.email AS sellerEmail
          FROM csc648_team6DB.itemPost
          INNER JOIN csc648_team6DB.categories ON itemPost.categoryId = categories.categoryId
          INNER JOIN csc648_team6DB.users ON itemPost.userId = users.userId
          WHERE ${whereClauses.join(" AND ")}`;
        values = [
          ...(searchQuery ? [`%${searchQuery}%`, `%${searchQuery}%`] : []),
          ...(selectedCategory ? [selectedCategory] : []),
        ];
      }

      const [result] = await db.query(query, values);

      if (result.length === 0) {
        // No results found, fetch random items
        let randomQuery = `
          SELECT itemPost.*, categories.categoryName AS category, users.username AS sellerName, users.email AS sellerEmail
          FROM csc648_team6DB.itemPost
          INNER JOIN csc648_team6DB.categories ON itemPost.categoryId = categories.categoryId
          INNER JOIN csc648_team6DB.users ON itemPost.userId = users.userId
          WHERE itemPost.isSold = 0 AND itemPost.isAuthorized = 1 ORDER BY RAND() LIMIT 10`;

        const [randomItems] = await db.query(randomQuery);
        res.locals.items = randomItems;
        res.locals.message = "Item not found, but here some currated items"; // Custom message
      } else {
        res.locals.items = result; // Assign search result to res.locals.items
        res.locals.message = "Results";
      }

      next();
    } catch (error) {
      console.error("Error in search middleware:", error);
      res.status(500).send("Error fetching items");
    }
  },

  // Middleware to return recent items for the home page
  getRecentPosts: async function (req, res, next) {
    try {
      const query = `
        SELECT itemPost.*, categories.categoryName AS category, users.username AS sellerName, users.email AS sellerEmail
        FROM csc648_team6DB.itemPost
        INNER JOIN csc648_team6DB.categories ON itemPost.categoryId = categories.categoryId
        INNER JOIN csc648_team6DB.users ON itemPost.userId = users.userId
        WHERE itemPost.isSold = 0 AND itemPost.isAuthorized = 1
        ORDER BY itemPost.postId DESC
        LIMIT 9`;

      const [recentItems] = await db.query(query);
      res.locals.recentPosts = recentItems.length > 0 ? recentItems : [];
      next();
    } catch (error) {
      console.error("Error fetching recent posts:", error);
      res.status(500).send("Error fetching recent posts");
    }
  },
};
