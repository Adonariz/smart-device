'use strict';

var naviListButton = document.querySelector('.page-footer__list-button--navi');
var naviList = document.querySelector('.page-footer__navi-list');
var contactsListButton = document.querySelector('.page-footer__list-button--contacts');
var contactsList = document.querySelector('.page-footer__contacts-list');
var buttons = document.querySelectorAll('.page-footer__list-button');

var MOBILE_WIDTH = 767;

if (window.innerWidth <= MOBILE_WIDTH) {
  naviList.classList.add('visually-hidden');
  contactsList.classList.add('visually-hidden');
}

window.addEventListener('resize', function () {
  if (window.innerWidth <= MOBILE_WIDTH) {
    naviList.classList.add('visually-hidden');
    contactsList.classList.add('visually-hidden');
    naviListButton.classList.add('page-footer__list-button--closed');
    naviListButton.classList.remove('page-footer__list-button--opened');
    contactsListButton.classList.add('page-footer__list-button--closed');
    contactsListButton.classList.remove('page-footer__list-button--opened');
  } else {
    naviList.classList.remove('visually-hidden');
    contactsList.classList.remove('visually-hidden');
  }
});

var switchLists = function (evt) {
  var target = evt.target;

  if (target === naviListButton) {
    if (target.classList.contains('page-footer__list-button--opened')) {
      target.classList.remove('page-footer__list-button--opened');
      target.classList.add('page-footer__list-button--closed');
      naviList.classList.add('visually-hidden');
    } else {
      naviList.classList.remove('visually-hidden');
      target.classList.remove('page-footer__list-button--closed');
      target.classList.add('page-footer__list-button--opened');

      contactsList.classList.add('visually-hidden');
      contactsListButton.classList.remove('page-footer__list-button--opened');
      contactsListButton.classList.add('page-footer__list-button--closed');
    }
  }

  if (target === contactsListButton) {
    if (target.classList.contains('page-footer__list-button--opened')) {
      target.classList.remove('page-footer__list-button--opened');
      target.classList.add('page-footer__list-button--closed');
      contactsList.classList.add('visually-hidden');
    } else {
      contactsList.classList.remove('visually-hidden');
      target.classList.remove('page-footer__list-button--closed');
      target.classList.add('page-footer__list-button--opened');

      naviList.classList.add('visually-hidden');
      naviListButton.classList.remove('page-footer__list-button--opened');
      naviListButton.classList.add('page-footer__list-button--closed');
    }
  }
};

// buttons.forEach(function (button) {
//   button.addEventListener('click', switchLists);
// });

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', switchLists);
}
