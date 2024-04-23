/*
 * This script handles form validation and modal management for login and signup processes.
 * It ensures that form inputs are validated according to specific criteria before submitting
 * and resets input fields and validation messages upon modal closure or switch.
 */

document.addEventListener("DOMContentLoaded", function () {
    var loginForm = document.getElementById('loginForm');
    var signupForm = document.getElementById('signupForm');

    // Reset all validation states and messages
    function resetValidation(form) {
        var inputs = form.getElementsByTagName('input');
        Array.from(inputs).forEach(function (input) {
            input.classList.remove('is-invalid');  // Remove the validation error class
            input.setCustomValidity('');  // Clear custom validity messages
        });
    }

    // Reset modal fields and validation messages
    function resetModal(modalId, form) {
        $(modalId).on('hidden.bs.modal', function () {
            $(modalId).find('input').val('');  // Clears all input fields
            resetValidation(form);  // Reset validation styles and messages
        });
    }

    // Reset fields and validations when modal is closed or switched
    resetModal('#loginModal', loginForm);
    resetModal('#signupModal', signupForm);    // Validate email addresses specific to SFSU


    function validateEmail(email) {
        return email.match(/.*@sfsu\.edu$|.*@mail\.sfsu\.edu$/);
    }

    // Validate that the first name and last name are not just whitespace
    function validateName(name) {
        return name.trim() !== '';
    }

    // Validate password criteria (Example: minimum 8 characters)
    function validatePassword(password) {
        return password.length >= 8;
    }

    // Check if passwords match
    function confirmPassword(password, confirmPassword) {
        return password === confirmPassword;
    }

    // Handle login form submission
    loginForm.addEventListener('submit', function (event) {
        var emailInput = document.getElementById('sfsuEmailLogin');
        var passwordInput = document.getElementById('password');

        if (!validateEmail(emailInput.value)) {
            event.preventDefault();
            emailInput.classList.add('is-invalid');
        } else {
            emailInput.classList.remove('is-invalid');
        }

        if (!passwordInput.value) {
            event.preventDefault();
            passwordInput.classList.add('is-invalid');
        } else {
            passwordInput.classList.remove('is-invalid');
        }
    });

    // Handle signup form submission
    signupForm.addEventListener('submit', function (event) {
        var firstnameInput = document.getElementById('firstname');
        var lastnameInput = document.getElementById('lastname');
        var emailInput = document.getElementById('sfsuEmailSignup');
        var passwordInput = document.getElementById('passwordSignup');
        var confirmPasswordInput = document.getElementById('confirmPassword');
        var tosCheckbox = document.getElementById('tosCheck');

        if (!validateName(firstnameInput.value)) {
            event.preventDefault();
            firstnameInput.classList.add('is-invalid');
        } else {
            firstnameInput.classList.remove('is-invalid');
        }

        if (!validateName(lastnameInput.value)) {
            event.preventDefault();
            lastnameInput.classList.add('is-invalid');
        } else {
            lastnameInput.classList.remove('is-invalid');
        }

        if (!validateEmail(emailInput.value)) {
            event.preventDefault();
            emailInput.classList.add('is-invalid');
        } else {
            emailInput.classList.remove('is-invalid');
        }

        if (!validatePassword(passwordInput.value)) {
            event.preventDefault();
            passwordInput.classList.add('is-invalid');
        } else {
            passwordInput.classList.remove('is-invalid');
        }

        if (!confirmPassword(passwordInput.value, confirmPasswordInput.value)) {
            event.preventDefault();
            confirmPasswordInput.setCustomValidity('Passwords do not match');
            confirmPasswordInput.classList.add('is-invalid');
        } else {
            confirmPasswordInput.setCustomValidity('');
            confirmPasswordInput.classList.remove('is-invalid');
        }

        if (!tosCheckbox.checked) {
            event.preventDefault();
            tosCheckbox.classList.add('is-invalid');
        } else {
            tosCheckbox.classList.remove('is-invalid');
        }
    });
});
