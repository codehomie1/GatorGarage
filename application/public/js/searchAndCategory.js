/**
 * Search and Category Script - Gator Garage Web Application
 *
 * This script enhances the search functionality by managing the state of query parameters and category selections.
 * It initializes the search inputs based on URL parameters and updates category displays and values upon user interactions.
 */
document.addEventListener('DOMContentLoaded', function(e) {
    // Get current URL and query parameters
    const currentUrl = new URL(window.location);
    const urlParams = new URLSearchParams(currentUrl.search);

    const query = urlParams.get('query');
    const category = urlParams.get('category');

    // Set the values of inputs from URL parameters
    const searchInput = document.querySelector('input[name="query"]');
    const categoryButton = document.querySelector('#category-btn');
    const hiddenCategoryInput = document.querySelector('input[name="category"]');

    searchInput.value = query || '';
    categoryButton.innerText = category || "All";
    hiddenCategoryInput.value = category || "All";

    // Event listeners for category changes
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const selectedCategory = item.textContent.trim();

            // Update displayed category and hidden input
            categoryButton.innerText = selectedCategory;
            hiddenCategoryInput.value = selectedCategory;

            // Update URL parameters and navigate
            urlParams.set('category', selectedCategory);
            urlParams.set('query', searchInput.value);  // Make sure to capture ongoing input in search field

            currentUrl.pathname = '/search'; // Set the path to the search route

            // Redirect by setting the search property of the location
            currentUrl.search = urlParams.toString();
            window.location.href = currentUrl.toString();
        });
    });
});
