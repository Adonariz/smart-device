'use strict';

(function () {
  var body = document.body;
  var popupButton = document.querySelector('.page-header__button');
  var popup = document.querySelector('.popup');

  if (popup) {
    var popupClose = popup.querySelector('.popup__close');
    var popupName = popup.querySelector('[name=popup-name]');
    var popupPhone = popup.querySelector('[name=popup-tel]');
    var popupComment = popup.querySelector('[name=popup-comment]');
  }

  var naviListButton = document.querySelector('.page-footer__list-button--navi');
  var naviList = document.querySelector('.page-footer__navi-list');
  var contactsListButton = document.querySelector('.page-footer__list-button--contacts');
  var contactsList = document.querySelector('.page-footer__contacts-list');
  var buttons = document.querySelectorAll('.page-footer__list-button');
  var naviHeadings = document.querySelectorAll('.page-footer__navi-heading');
  var form = document.querySelector('.feedback__form');

  if (form) {
    var userName = form.querySelector('[name=name]');
    var userPhone = form.querySelector('[name=tel]');
    var userComment = form.querySelector('[name=comment]');
  }

  var MOBILE_WIDTH = 767;
  var ESC_KEY = 27;

  // скрипт для работы попапа
  if (popupButton) {
    popupButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      openPopup();
    });
  }

  var openPopup = function () {
    if (popup) {
      popup.classList.remove('popup--closed');
      body.style.overflow = 'hidden';

      popupName.focus();

      popupClose.addEventListener('click', closePopup);
      document.addEventListener('keydown', popupEscHandler);
      document.addEventListener('click', overlayClickHandler);
    }

  };

  var closePopup = function () {
    popup.classList.add('popup--closed');
    body.style.removeProperty('overflow');

    setDefaultValues();

    popupClose.removeEventListener('click', closePopup);
    document.removeEventListener('keydown', popupEscHandler);
    document.removeEventListener('click', overlayClickHandler);
  };

  var popupEscHandler = function (evt) {
    if (evt.keyCode === ESC_KEY) {
      evt.preventDefault();
      closePopup();
    }
  };

  var overlayClickHandler = function (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup();
    }
  };

  var setDefaultValues = function () {
    popupName.value = '';
    popupPhone.value = '';
    popupComment.value = '';
    popupName.style.border = 'none';
    popupPhone.style.border = 'none';
  };

  // локальное хранилище
  if (form) {
    form.addEventListener('submit', function () {
      localStorage.setItem('name', userName.value);
      localStorage.setItem('phone', userPhone.value);
      localStorage.setItem('question', userComment.value);
    });
  }

  if (popup) {
    popup.addEventListener('submit', function () {
      localStorage.setItem('name', popupName.value);
      localStorage.setItem('phone', popupPhone.value);
      localStorage.setItem('question', popupComment.value);
    });
  }

  // скрипт для маски телефона
  window.addEventListener('DOMContentLoaded', function () {
    function setCursorPosition(pos, elem) {
      elem.focus();
      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    }

    function mask(event) {
      var matrix = '+7 (___) ___-__-__';
      var i = 0;
      var def = matrix.replace(/\D/g, '');
      var val = this.value.replace(/\D/g, '');

      if (def.length >= val.length) {
        val = def;
      }

      this.value = matrix.replace(/./g, function (a) {
        if (/[_\d]/.test(a) && i < val.length) {
          return val.charAt(i++);
        } else if (i >= val.length) {
          return '';
        } else {
          return a;
        }
      });

      if (event.type === 'blur') {
        if (this.value.length === 2) {
          this.value = '';
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }

    if (form) {
      var userPhoneForm = form.querySelector('#tel');

      userPhoneForm.addEventListener('input', mask, false);
      userPhoneForm.addEventListener('focus', mask, false);
      userPhoneForm.addEventListener('blur', mask, false);
    }

    if (popup) {
      var userPhonePopup = popup.querySelector('#popup-tel');

      userPhonePopup.addEventListener('input', mask, false);
      userPhonePopup.addEventListener('focus', mask, false);
      userPhonePopup.addEventListener('blur', mask, false);
    }
  });

  // скрипт для работы аккордеона
  if (window.innerWidth <= MOBILE_WIDTH) {
    if (naviList) {
      naviList.classList.add('visually-hidden');
    }

    if (contactsList) {
      contactsList.classList.add('visually-hidden');
    }
  }

  window.addEventListener('resize', function () {
    if (window.innerWidth <= MOBILE_WIDTH) {
      if (naviList) {
        naviList.classList.add('visually-hidden');
        naviListButton.classList.add('page-footer__list-button--closed');
        naviListButton.classList.remove('page-footer__list-button--opened');
      }

      if (contactsList) {
        contactsList.classList.add('visually-hidden');
        contactsListButton.classList.add('page-footer__list-button--closed');
        contactsListButton.classList.remove('page-footer__list-button--opened');
      }
    } else {
      if (naviList) {
        naviList.classList.remove('visually-hidden');
      }

      if (contactsList) {
        contactsList.classList.remove('visually-hidden');
      }
    }
  });

  var switchLists = function (evt) {
    var target = evt.target;

    if (target === naviListButton || target.classList.contains('page-footer__navi-heading--sections')) {
      if (naviListButton.classList.contains('page-footer__list-button--opened')) {
        naviListButton.classList.remove('page-footer__list-button--opened');
        naviListButton.classList.add('page-footer__list-button--closed');
        naviList.classList.add('visually-hidden');
      } else {
        naviList.classList.remove('visually-hidden');
        naviListButton.classList.remove('page-footer__list-button--closed');
        naviListButton.classList.add('page-footer__list-button--opened');

        contactsList.classList.add('visually-hidden');
        contactsListButton.classList.remove('page-footer__list-button--opened');
        contactsListButton.classList.add('page-footer__list-button--closed');
      }
    }

    if (target === contactsListButton || target.classList.contains('page-footer__navi-heading--contacts')) {
      if (contactsListButton.classList.contains('page-footer__list-button--opened')) {
        contactsListButton.classList.remove('page-footer__list-button--opened');
        contactsListButton.classList.add('page-footer__list-button--closed');
        contactsList.classList.add('visually-hidden');
      } else {
        contactsList.classList.remove('visually-hidden');
        contactsListButton.classList.remove('page-footer__list-button--closed');
        contactsListButton.classList.add('page-footer__list-button--opened');

        naviList.classList.add('visually-hidden');
        naviListButton.classList.remove('page-footer__list-button--opened');
        naviListButton.classList.add('page-footer__list-button--closed');
      }
    }
  };

  if (buttons) {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', switchLists);
    }
  }

  if (naviHeadings) {
    for (var i = 0; i < naviHeadings.length; i++) {
      naviHeadings[i].addEventListener('click', switchLists);
    }
  }
})();
