// Stamp the hidden timestamp field with the moment the form was loaded.
const timestampField = document.querySelector("#timestamp");
if (timestampField) {
  timestampField.value = new Date().toISOString();
}

// Membership-level modals: each "Learn More" button opens its dialog,
// each dialog's "Close" button closes it. Triggered by click, not hover.
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const modal = document.querySelector(`#${trigger.dataset.modal}`);
    if (modal) {
      modal.showModal();
    }
  });
});

const closeButtons = document.querySelectorAll(".modal-close");
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.closest("dialog").close();
  });
});
