    document.addEventListener('DOMContentLoaded', function () {
        var signupForm = document.getElementById('signupForm');
        var password = document.getElementById('passwordSignup');
        var confirmPassword = document.getElementById('confirmPassword');
        var email = document.getElementById('sfsuEmailSignup');

        function validateEmail() {
            if (!email.checkValidity()) {
                email.classList.add('is-invalid');
                email.reportValidity();
            } else {
                email.classList.remove('is-invalid');
            }
        }

        email.addEventListener('input', validateEmail);

        signupForm.addEventListener('submit', function (event) {
            if (password.value !== confirmPassword.value) {
                event.preventDefault();
                confirmPassword.setCustomValidity('Passwords do not match');
                confirmPassword.reportValidity();
            } else {
                confirmPassword.setCustomValidity('');
            }

            if (!signupForm.checkValidity()) {
                event.preventDefault();
                signupForm.classList.add('was-validated');
            }
        });
    });
