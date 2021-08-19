'use strict';

const welcomeEl = document.querySelector('.welcome');
const btnLogout = document.querySelector('.btn-logout');

const accState = {
  sitterAccs: [],
  currUser: null,
};

const updateWelcomeMsg = function () {
  welcomeEl.textContent = `Welcome ${
    accState.currUser?.firstName ?? 'Imposter'
  }`;
};

const updateAccState = function () {
  accState.currUser = JSON.parse(localStorage.getItem('currUser'));
  updateWelcomeMsg();
};
updateAccState();

////////////////////////// LOGOUT /////////////////////////////
btnLogout.addEventListener('click', function () {
  accState.currUser = null;
  localStorage.removeItem('currUser');

  window.location.replace('/pets.html');
});
