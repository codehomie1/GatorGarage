document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.from(forms).forEach(function(form) {
    form.addEventListener('submit', event => {
      const password = document.getElementById('passwordSignup');
      const confirmPassword = document.getElementById('confirmPassword');

      if (form.id === 'signupForm') {
        if (password.value !== confirmPassword.value) {
          event.preventDefault();
          confirmPassword.setCustomValidity('Passwords do not match');
          confirmPassword.reportValidity();
        } else {
          confirmPassword.setCustomValidity('');
        }
      }

      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add('was-validated');
    }, false);
  });

  // Correctly select modal close buttons and add reset logic
  const closeButtons = document.querySelectorAll('[data-dismiss="modal"]');

  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal'); // Find closest parent modal
      const forms = modal.querySelectorAll('.needs-validation');
      forms.forEach(form => {
        form.reset(); // Reset forms within modal
        form.classList.remove('was-validated'); // Remove validation classes
      });
    });
  });
});
