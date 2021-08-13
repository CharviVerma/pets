'use strict';

const navEl = document.querySelector('.navbar-nav');
const closeModalBtns = document.querySelectorAll('.cls-modal');
const overlay = document.querySelector('.overlay');
const formHiddenEls = document.querySelectorAll('.form-hidden');

navEl.addEventListener('click', function (e) {
  e.preventDefault();
  const formToDisplay = e.target.dataset.formType;
  if (!formToDisplay) return;

  const formEl = document.querySelector(`#${formToDisplay}`);
  console.log(formEl);
  formEl.classList.remove('form-hidden');
  overlay.classList.remove('form-hidden');
});

closeModalBtns.forEach((btn) =>
  btn.addEventListener('click', function () {
    formHiddenEls.forEach((el) => {
      if (!el.classList.contains('form-hidden')) {
        el.classList.add('form-hidden');
      }
    });
  })
);
