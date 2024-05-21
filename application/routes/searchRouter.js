/**
 * Search Routes
 *
 * Routes dedicated to handling search functionality. This module is responsible
 * for setting up the '/search' endpoint, processing search queries, and rendering
 * the corresponding view with the results.
 *
 * @module searchRoutes
 *
 * Dependencies:
 *  - express: Framework for routing.
 *  - search: Middleware for searching items based on given criteria.
 *  - getCategoriesModule: Middleware for fetching category data.
 *
 * Route Definitions:
 *  - GET '/': Processes search queries and displays the search results page.
 *  - This route is accessed via '/search' due to the base path set in app.js.
 */

// Import express and necessary middleware
const express = require("express");
const router = express.Router();
const search = require("../middleware/search");
const getCategoriesModule = require("../middleware/getCategories.js");

// Define the '/search' in searchRoutes to root since it will be prefixed with '/search' in app.js
router.get("/", search.searchItems, async (req, res) => {
  const searchQuery = req.query.query || ""; // Default to an empty string if no keywords are provided
  const currentCategory = req.query.category || ""; // Default to no specific category
  const page = parseInt(req.query.page) || 1; // Get the current page number or default to 1
  const limit = parseInt(req.query.limit) || 9; // Get the limit per page or default to 10

  let items = res.locals.items || []; // Default to an empty array if no items are present
  const categories = await getCategoriesModule.getCategories(req, res);
  const sort = req.query.sort || "default"; // Default sorting option

  // Apply sorting based on the 'sort' query parameter
  switch (sort) {
    case "price_asc":
      items.sort((a, b) => a.itemPrice - b.itemPrice);
      break;
    case "price_desc":
      items.sort((a, b) => b.itemPrice - a.itemPrice);
      break;
    case "alpha_asc":
      items.sort((a, b) => a.itemName.localeCompare(b.itemName));
      break;
    case "alpha_desc":
      items.sort((a, b) => b.itemName.localeCompare(a.itemName));
      break;
  }

  // Pagination logic to slice items for current page
  const totalResults = items.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  items = items.slice(startIndex, endIndex);

  // Check for out-of-range page access and redirect or handle appropriately
  if (page < 1 || startIndex >= totalResults) {
    return res.redirect(
      `/search?query=${encodeURIComponent(
        searchQuery
      )}&category=${encodeURIComponent(currentCategory)}&page=1&limit=${limit}`
    );
  }

  // Render the 'search' view with the necessary data
  res.render("search", {
    items: items,
    searchQuery: searchQuery,
    totalResults: totalResults,
    categories: categories,
    currentCategory: currentCategory,
    currentSort: sort,
    page: page,
    limit: limit,
    startIndex: startIndex + 1, // For display purposes, index starts at 1
    endIndex: Math.min(endIndex, totalResults), // Ensure not to exceed total results
  });
});

// Export the router for use in the main application
module.exports = router;
