'use strict';

const showUpFormBtn = document.querySelector('.account-link');
const hiddenStuff = document.querySelectorAll('.hidden');
const modelEl = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.cls-modal');

const toggleModal = function () {
  hiddenStuff.forEach((el) => {
    el.classList.toggle('hidden');
  });
};

showUpFormBtn.addEventListener('click', toggleModal);

closeModalBtn.addEventListener('click', toggleModal);
