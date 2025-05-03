document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', handleSubmit);
  });

  function handleSubmit(e) {
    e.preventDefault();
    // Form validation and success handling
  }
});