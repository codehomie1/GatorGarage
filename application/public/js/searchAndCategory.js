document.addEventListener('DOMContentLoaded', function(e) {
     
  // Get the query parameter value
  const urlParams = new URLSearchParams(window.location.search);

  const query = urlParams.get('query');
  const category = urlParams.get('category');

  // persists query and search
  document.querySelector('input[name="query"]').value = query || '';
    const categoryButton = document.querySelector('#category-btn');
    categoryButton.innerText = category || "All";

    // Set the hidden input value to match the category button for consistent data handling
    document.querySelector('input[name="category"]').value = categoryButton.innerText;


    // updates the dropdown to have the  selected category when an option is clicked.
    // sends input category param to backend.
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            document.querySelector('#category-btn').innerText = item.innerText;
            document.querySelector('input[name="category"]').value = item.innerText;
        });
    });
});


