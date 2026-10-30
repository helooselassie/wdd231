const menuButton = document.querySelector('#menu');
const nav = document.querySelector('#primary-nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
  menuButton.textContent = open ? '✕' : '☰';
});
