/**
 * Form Validation and Handling Script
 * This JavaScript file contains a comprehensive suite of functions for the validation and handling of HTML forms.
 * It specifically manages password and confirmPassword fields to ensure they match, and prevents form submission
 * if validation fails. Additionally, it handles successful form submissions by displaying a success message and
 * redirecting the user.
 *
 * Functions included:
 * - initializeFormValidation: Sets up validation for all forms on the page.
 * - handleFormSubmission: Manages the form submission process.
 * - validatePasswords: Checks if passwords in a given form match.
 * - checkValidity: Validates individual input fields.
 * - validateInputOnSubmit: Validates all input fields when the form is submitted.
 * - preventFormSubmission: Prevents form submission if validation fails.
 * - showSuccessMessageAndRedirect: Displays a success message and redirects the user.
 * - arePasswordsMatching: Checks if the password and confirmPassword fields match.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize form validation
  initializeFormValidation();

  // Handle form submission
  handleFormSubmission();
});

// Initialize form validation
function initializeFormValidation() {
  // Get all forms on the page
  const forms = Array.from(document.querySelectorAll('form'));

  // For each form on the page
  forms.forEach((form) => {
    const password = form.querySelector('#passwordSignup');
    const confirmPassword = form.querySelector('#confirmPassword');

    // Passwords validation function
    function validatePasswords() {
      const isValid = password.value === confirmPassword.value;
      confirmPassword.setCustomValidity(isValid ? '' : 'Passwords do not match');
      confirmPassword.classList[isValid ? 'remove' : 'add']('is-invalid');
    }

    // Get all form elements
    const elements = Array.from(form.elements);

    // Validate each form element only after it has been touched
    elements.forEach((input) => {
      input.isTouched = false;
      input.addEventListener('focus', () => input.isTouched = true);
      input.addEventListener('blur', () => {
        if (input.isTouched) checkValidity(input);
      });
      // Add listener for password fields
      if (input === password || input === confirmPassword) {
        input.addEventListener('input', validatePasswords);
      }
    });
  });
}

// Handle form submission for a signup modal submit button
function handleFormSubmission() {

  const submitButton = document.querySelector('#signupForm button[type="submit"]');

  if (submitButton) {
    // Add a click event listener to the submit button
    submitButton.addEventListener('click', (event) => {
      // Prevent default action, which is the form submission
      event.preventDefault();

      // Access the form directly via the button
      const form = submitButton.closest('form');

      // Convert the form elements into an array and check each element
      const elements = Array.from(form.elements);
      let isFormValid = elements.every(input => validateInputOnSubmit(input));

      // Make sure password and confirmPassword fields match
      validatePasswords(form);

      if (!isFormValid || !arePasswordsMatching(form)) {
        // Handle prevention of form submission and display feedback
        preventFormSubmission(event, form);
      } else {
        // If all checks are valid, proceed to submit the form data
        submitFormData(form);
      }

      // Add a 'was-validated' class to the form for visual feedback
      form.classList.add('was-validated');
    });
  }
}

function submitFormData(form) {
  // Placeholder for form submission
  console.log('Form submitted successfully');
  showSuccessMessageAndRedirect();
}

// Check validity of individual form controls
function checkValidity(input) {
  const isValid = input.checkValidity();
  input.classList[isValid ? 'remove' : 'add']('is-invalid');
  return isValid;
}

// Validate input fields on form submission
function validateInputOnSubmit(input) {
  if (input.isTouched && !checkValidity(input)) {
    input.classList.add('is-invalid');
    return false;
  }
  return true;
}

// Prevent form submission if there are validation errors
function preventFormSubmission(event, form) {
  event.preventDefault();
  event.stopPropagation();
  form.classList.add('was-validated');
}

// Show success message and redirect user after successful form submission
function showSuccessMessageAndRedirect() {
  alert('Congratulations! Your account has been created successfully.'); // Properly call alert
  setTimeout(function () {
    location.replace(window.location.href); // Redirect to the stored URL
  }, 500);
}


// Validate passwords on form submission
function validatePasswords(form) {
  const password = form.querySelector('#passwordSignup');
  const confirmPassword = form.querySelector('#confirmPassword');
  const isValid = password.value === confirmPassword.value;
  confirmPassword.setCustomValidity(isValid ? '' : 'Passwords do not match');
  confirmPassword.classList[isValid ? 'remove' : 'add']('is-invalid');
}

// Check if passwords match
function arePasswordsMatching(form) {
  const password = form.querySelector('#passwordSignup');
  const confirmPassword = form.querySelector('#confirmPassword');
  return password.value === confirmPassword.value;
}
