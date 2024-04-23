/**
 * Signup and Login Modal Interactions
 * This JavaScript file manages interactions between the signup and login modals.
 * It listens for modal show events and transfers the written email from one modal to another.
 *
 * Event Listeners:
 * - Transfer written email from login modal to signup modal on show event
 * - Transfer written email from signup modal to login modal on show event
 * - Clear form validation when modals are shown or hidden
 */

// Function to clear form validation
function clearFormValidation(form) {
  form.classList.remove('was-validated');
  form.querySelectorAll('.is-invalid').forEach((input) => {
    input.classList.remove('is-invalid');
  });
}

// Function to transfer email value between modals
function transferEmailValue(sourceModal, targetModal, sourceEmailField, targetEmailField) {
  const emailValue = sourceModal.find(sourceEmailField).val();
  targetModal.find(targetEmailField).val(emailValue);
}

document.addEventListener('DOMContentLoaded', () => {
  // Get all forms on the page
  const forms = Array.from(document.querySelectorAll('form'));

  // Clear form validation when modals are hidden
  $('#signupModal, #loginModal').on('hidden.bs.modal', function () {
    forms.forEach((form) => {
      clearFormValidation(form);
    });
  });

  // Transfer written email from login modal to signup modal
  $('#signupModal').on('show.bs.modal', function () {
    transferEmailValue($('#loginModal'), $('#signupModal'), '#sfsuEmailLogin', '#sfsuEmailSignup');
  });

  // Transfer written email from signup modal to login modal
  $('#loginModal').on('show.bs.modal', function () {
    transferEmailValue($('#signupModal'), $('#loginModal'), '#sfsuEmailSignup', '#sfsuEmailLogin');
  });

  // Clear form validation when modals are shown
  $('#signupModal, #loginModal').on('show.bs.modal', function () {
    const form = this.querySelector('form');
    clearFormValidation(form);
  });
});
