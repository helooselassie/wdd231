const timestampField = document.querySelector('#timestamp');
const modalButtons = document.querySelectorAll('[data-modal]');

// Record when the form was loaded in this visitor's browser
timestampField.value = new Date().toISOString();

modalButtons.forEach((button) => {
  const modal = document.getElementById(button.dataset.modal);
  button.addEventListener('click', () => modal.showModal());
});

document.querySelectorAll('.modal').forEach((modal) => {
  modal.querySelector('.close-modal').addEventListener('click', () => modal.close());

  // A click on the dark backdrop lands on the dialog element itself, so close it
  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.close();
  });
});
