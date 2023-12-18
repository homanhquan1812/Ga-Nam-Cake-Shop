const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', ()=> {
  wrapper.classList.add('active');
  document.querySelector('.button-active').style.display = '';
});
loginLink.addEventListener('click', ()=> {
  wrapper.classList.remove('active');
  document.querySelector('.button-active').style.display = 'none';
});
btnPopup.addEventListener('click', ()=> {
  wrapper.classList.add('active-popup');
});
iconClose.addEventListener('click', ()=> {
  wrapper.classList.remove('active-popup');
});