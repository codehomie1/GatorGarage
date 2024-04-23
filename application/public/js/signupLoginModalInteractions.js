// Function to transfer email value between modals
function transferEmailValue(sourceModalId, targetModalId, sourceEmailFieldId, targetEmailFieldId) {
  const emailValue = $(sourceModalId).find(sourceEmailFieldId).val();
  $(targetModalId).find(targetEmailFieldId).val(emailValue);
}

document.addEventListener('DOMContentLoaded', () => {
  // Handle modal email transfer for both modal show events
  const handleModalEmailTransfer = (sourceModalId, targetModalId, sourceFieldId, targetFieldId) => {
    $(targetModalId).on('show.bs.modal', () => {
      transferEmailValue(sourceModalId, targetModalId, sourceFieldId, targetFieldId);
    });
  };

  // Setup modal email transfers
  handleModalEmailTransfer('#loginModal', '#signupModal', '#sfsuEmailLogin', '#sfsuEmailSignup');
  handleModalEmailTransfer('#signupModal', '#loginModal', '#sfsuEmailSignup', '#sfsuEmailLogin');
});
