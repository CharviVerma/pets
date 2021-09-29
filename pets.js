'use strict';

const navEl = document.querySelector('.navbar-nav');
const closeModalBtns = document.querySelectorAll('.cls-modal');
const overlay = document.querySelector('.overlay');
const formHiddenEls = document.querySelectorAll('.form-hidden');
const formSignupEl = document.querySelector('.form-signup');
const formLoginEl = document.querySelector('.form-login');
const navItemEls = document.querySelectorAll('.nav-item');

///////////////////////// CLASS USER /////////////////////////////
class User {
  constructor(firstName, lastName, email, password, pettype) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.pettype = pettype;
  }
}

////////////////////////////// STATE /////////////////////////////
const petState = {
  userAccs: [],
  currUser: null,
};

const updatePetState = function (userObj, status) {
  if (userObj) {
    if (status === 'signup') {
      petState.userAccs.push(userObj);
      localStorage.setItem('userAccs', JSON.stringify(petState.userAccs));
    }
    petState.currUser = userObj;
    localStorage.setItem('currUser', JSON.stringify(petState.currUser));
  } else {
    petState.userAccs = JSON.parse(localStorage.getItem('userAccs')) ?? [];
  }
};
updatePetState();

/////////////////////// UPDATE NAV LINKS ////////////////////////
/*
const updateNavLinks = function (...htmlStringsArr) {
  navItemEls.forEach((navEl) => (navEl.innerHTML = ''));
  navItemEls.forEach((navEl, i) => {
    navEl.insertAdjacentHTML('afterbegin', htmlStringsArr[i]);
  });
};
*/

////////// FORMS SHOW UP AND LOGOUT EVENT-LISTENERS /////////////
navEl.addEventListener('click', function (e) {
  e.preventDefault();
  const formType = e.target.dataset.formType;
  if (!formType) return;

  /*
  if (formType === 'logoutForm') {
    updateNavLinks(
      `<a class="nav-link" href="#" data-form-type="signupForm">Sign Up</a>`,
      `<a class="nav-link" href="#" data-form-type="loginForm">Login</a>`
    );
    petState.currUser = null;
  } else {
    const formEl = document.querySelector(`#${formType}`);
    formEl.classList.remove('form-hidden');
    overlay.classList.remove('form-hidden');

    formEl.querySelector('input').focus();
  }
  */
  const formEl = document.querySelector(`#${formType}`);
  formEl.classList.remove('form-hidden');
  overlay.classList.remove('form-hidden');

  formEl.querySelector('input').focus();
});

const hideModal = function () {
  formHiddenEls.forEach((el) => {
    if (!el.classList.contains('form-hidden')) {
      el.classList.add('form-hidden');
    }
  });
};

closeModalBtns.forEach((btn) => btn.addEventListener('click', hideModal));

//////////////// SIGN-UP FORM SUBMIT ///////////////////
// Check if any inputs are empty
const validateInputs = function (dataObj) {
  const valuesArr = Object.values(dataObj);
  for (let val of valuesArr) {
    if (val.trim() === '') return false;
  }
  return true;
};

// Check if email entered is already registered
const uniqueEmail = function (email) {
  return !petState.userAccs.some((acc) => acc.email === email);
};

formSignupEl.addEventListener('submit', function (e) {
  e.preventDefault();
  const data = [...new FormData(this)];
  const dataObj = Object.fromEntries(data);

  // FORM VALIDATION(Check if any inputs are empty)
  if (!validateInputs(dataObj))
    return alert(
      'Nice prank mate! Hope you are having a great day messing with unpaid web-devs. Your dog must be real proud of you!'
    );

  dataObj.firstName = `${dataObj.firstName[0].toUpperCase()}${dataObj.firstName
    .slice(1)
    .toLowerCase()}`;
  dataObj.lastName = `${dataObj.lastName[0].toUpperCase()}${dataObj.lastName
    .slice(1)
    .toLowerCase()}`;
  dataObj.email = dataObj.email.trim();
  console.log(dataObj);

  // Check if email entered is unique
  if (!uniqueEmail(dataObj.email))
    return alert(
      'Email entered is already in use, please login or use another email'
    );

  // Create new User Instance
  const userObj = new User(
    dataObj.firstName,
    dataObj.lastName,
    dataObj.email,
    dataObj.password,
    dataObj.pettype
  );
  updatePetState(userObj, 'signup');

  /*
  updateNavLinks(
    `<span class="nav-link welcome">Welcome ${dataObj.firstName}</span>`,
    `<a class="nav-link" href="#" data-form-type="logoutForm">Logout</a>`
  );
  */

  formSignupEl.reset();

  hideModal();

  // window.location.href = '/account.html';
  window.location.replace('/account.html');
});

////////////////////// SIGN-IN FORM SUBMIT //////////////////////////////
formLoginEl.addEventListener('submit', function (e) {
  e.preventDefault();
  const data = [...new FormData(this)];
  const dataObj = Object.fromEntries(data);
  dataObj.email = dataObj.email.trim();
  console.log(dataObj);

  if (!validateInputs(dataObj))
    return alert(
      'Hey! Since this is your first time visiting a "website", Let me help you: Fill all the form fields to login, also Hiroshima was nuked and WW2 has ended :)'
    );

  const userAcc = petState.userAccs.find((acc) => acc.email === dataObj.email);

  if (!userAcc) return alert('Email not registered, Please SignUp');
  if (userAcc.password !== dataObj.password)
    return alert('Incorrect Password!');

  /*
  updateNavLinks(
    `<span class="nav-link welcome">Welcome ${userAcc.firstName}</span>`,
    `<a class="nav-link" href="#" data-form-type="logoutForm">Logout</a>`
  );
  */

  updatePetState(userAcc, 'login');
  formLoginEl.reset();
  hideModal();

  window.location.replace('/account.html');
});

///////////////////////// CLEAR LOCAL STORAGE ///////////////////////////
const clearLS = function () {
  localStorage.clear();
};
