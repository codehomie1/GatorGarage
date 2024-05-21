/**
 * setupMessageModal.js
 *
 * This script enhances the interactivity of the application by handling the
 * dynamic content loading into the message modal based on user actions. It listens
 * for clicks on any 'message-button' elements, fetches detailed information about
 * the item associated with the button, and then populates a modal window with these
 * details to facilitate user messaging.
 *
 * Features:
 * - Fetch item details dynamically when a message button is clicked.
 * - Populate the modal with item details such as name, description, price, and more.
 * - Manage modal display and hide operations.
 *
 * Dependencies:
 * - Assumes the presence of a modal with specific IDs in the HTML structure (modalBody, messageModal).
 * - Relies on jQuery for modal manipulation and Bootstrap for modal functionality.
 * - Server-side endpoint `/message/{postId}` must be set up to return item details as JSON.
 *
 * Usage:
 * - Ensure this script is included in pages where items with message buttons are displayed.
 * - The HTML must have elements with the IDs and classes referenced in the script (e.g., 'message-button', 'modalBody').
 *
 * Error Handling:
 * - Captures and logs errors if the fetch operation fails or if data processing errors occur.
 *
 * Maintainers: Jacob G, Mohammed M, Cesar H
 */

// setupMessageModal.js
document.addEventListener("DOMContentLoaded", function () {
    const messageButtons = document.querySelectorAll('.message-button');
    const clickableCards = document.querySelectorAll('.clickable-card');
    const modalBody = document.getElementById('modalBody');
    const closeButton = document.querySelector('.close'); // Select the close button

    function showModal(postId) {
        fetch(`/message/${postId}`)
            .then(response => response.json())
            .then(data => {
                const postDetails = data.postDetails;
                const userID = data.userID;

                // Update modal content with data
                let courseHTML = '';
                if (postDetails.course) {
                    courseHTML = `<p class="card-text mb-3" id="courseDetails"><strong>Course:</strong> ${postDetails.course}</p>`;
                }

                modalBody.innerHTML = `
                            <div class="row">
                                <div class="col-md-8">
                                    <!-- Hidden input fields to store data -->
                                    <input type="hidden" id="senderId" value="<%= user.id %>">
                                    <input type="hidden" id="recipientId" value="${postDetails.userId}">
                                    <input type="hidden" id="postId" value="${postDetails.postId}">
                                
                                    <h4 class="card-title" id="productName">${postDetails.itemName}</h4>
                                    <hr class="hr bg-dark">
                                    <img src="${postDetails.itemPicture}" alt="${postDetails.itemName} picture" class="img-thumbnail img-fluid" id="productImage" style="width: 300px; height: auto;">
                                    <div class="mb-3"></div>
                                    <p class="card-text mb-3" id="productDescription"><strong>Description:</strong> ${postDetails.itemDescription}</p>
                                    ${courseHTML}
                                    <p class="card-text mb-3" id="itemPrice"><strong>Price:</strong> $${postDetails.itemPrice}</p>
                                    <p class="card-text mb-3" id="pickupLocation"><strong>SFSU Secure Pickup Location:</strong> ${postDetails.location}</p>
                                    <div class="form-group">
                                        <label class="fw-bold mb-0" for="message">Message:</label>
                                        <div class="mb-1">
                                            <small class="text-muted d-block">Consider including your contact information (e.g., phone number, email).</small>
                                            </div>
                                            <textarea class="form-control" id="message" name="message" rows="3" required placeholder="Type your message here..."></textarea>
                                    </div>
                                </div>
                                <div class="col-md-4 overflow-auto">
                                    <h4 class="card-title">Seller Information</h4>
                                    <hr class="hr bg-dark">
                                    <p class="mb-3" id="sellerName"><strong>Seller Name:</strong> ${postDetails.sellerName}</p>
                                    <p class="mb-3" id="sellerEmail"><strong>Contact Email:</strong> ${postDetails.sellerEmail}</p>
                                </div>
                            </div>
                    `;
                $('#messageModal').modal('show');
            })
            .catch(error => console.error('Error fetching post details:', error));
    }

    messageButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const postId = button.getAttribute('data-post-id');
            showModal(postId);
        });
    });

    clickableCards.forEach(function (card) {
        card.addEventListener("click", function () {
            const postId = card.getAttribute('data-post-id');
            showModal(postId);
        });
    });

    // Add click event listener to the close button
    closeButton.addEventListener('click', function () {
        $('#messageModal').modal('hide'); // Hide the modal
    });
});
