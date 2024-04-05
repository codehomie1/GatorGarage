const db = require('../conf/database');

module.exports = {
  searchItems: async function (req, res, next) {
    try {
      // Extracting search query and category from request parameters
      const searchQuery = req.query.query; // Passed through query string
      let selectedCategory = req.query.category; // Selected category through query string

      if (selectedCategory === '' || selectedCategory.toLowerCase() === 'all') {
        selectedCategory = null; // Set to null for clarity in handling the no-category case
      }

      var query;
      var values;

      if (selectedCategory) {
        // If a category is selected, include it in the search criteria
        query = `
          SELECT itemPost.*, categories.categoryName AS category
          FROM csc648_team6DB.itemPost
          INNER JOIN csc648_team6DB.categories ON itemPost.categoryId = categories.categoryId
          WHERE (itemPost.itemName LIKE ? OR itemPost.itemDescription LIKE ?)
            AND itemPost.isSold = 0
            AND categories.categoryName = ?`;

        // Prepare values for parameterized query to prevent SQL injection
        values = [`%${searchQuery}%`, `%${searchQuery}%`, selectedCategory];

      } else {
        // General search without specific category selection (all categories)
        query = `
          SELECT itemPost.*, categories.categoryName AS category
          FROM csc648_team6DB.itemPost
          INNER JOIN csc648_team6DB.categories ON itemPost.categoryId = categories.categoryId
          WHERE (itemPost.itemName LIKE ? OR itemPost.itemDescription LIKE ?)
            AND itemPost.isSold = 0`;

        values = [`%${searchQuery}%`, `%${searchQuery}%`];
      }

      // Execute the query with parameterization to prevent SQL injection
      const [result] = await db.query(query, values);

      // Handling empty result cases by returning random unsold items
      if (result.length === 0) {
        res.locals.isEmptyResult = true;
        query = `SELECT itemPost.*, categories.categoryName AS category
                 FROM csc648_team6DB.itemPost
                 INNER JOIN csc648_team6DB.categories ON itemPost.categoryId = categories.categoryId
                 WHERE itemPost.isSold = 0
                 ORDER BY RAND()
                 LIMIT 10`;
        const [emptyQueryResult] = await db.query(query);
        res.locals.items = emptyQueryResult;
        next();
      } else {
        // Forwarding found items to the next middleware or handler
        res.locals.isEmptyResult = false;
        res.locals.items = result;
        next();
      }

    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching items');
    }
  }
};