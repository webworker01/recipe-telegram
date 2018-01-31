const path = require('path');

module.exports = (Franz) => {
  var hideToggle = false;

  const getMessages = function getMessages() {
    let count = 0;
    const searchElement = document.querySelector('.im_dialogs_search_field');
    if (searchElement && searchElement.value === '') {
      const elements = document.querySelectorAll('.im_dialog_badge:not(.ng-hide):not(.im_dialog_badge_muted)');
      if (elements) {
        for (let i = 0; i < elements.length; i += 1) {
          if (elements[i].innerHTML !== 0) {
            count += 1;
          }
        }
      }
    }

    hideChats();

    Franz.setBadge(count);
  };

  const hideChats = function(toggle=false) {
    if (hideToggle) {
      var mutedchats = document.querySelectorAll('.im_dialogs_wrap .nav.nav-pills.nav-stacked li');
      for (var i = 5; i < mutedchats.length; i++) {
        mutedchats[i].style = 'display:block;'
      }
      document.getElementById('hidebtn').innerHTML = '🕵';
      if(toggle) {
        hideToggle = false;
      }
    } else {
      // var hideCSS = document.createElement('style');
      // hideCSS.id = 'hidecsscustom';
      // hideCSS.innerHTML = '.im_dialog_badge_muted { display:none;}';
      // document.querySelector('body').appendChild(hideCSS);
      var mutedchats = document.querySelectorAll('.im_dialog_badge_muted');
      for (var i = 5; i < mutedchats.length; i++) {
          mutedchats[i].parentElement.parentElement.parentElement.style = 'display:none;'
      }
      document.getElementById('hidebtn').innerHTML = '👁';
      if (toggle) {
        hideToggle = true;
      }
    }   
  }

  document.querySelector('body').className += ' darkTheme';

  var hideBtn = document.createElement('button');
  hideBtn.id = 'hidebtn';
  hideBtn.style = 'float: right; background: transparent; border: none; cursor: pointer;';
  hideBtn.innerHTML = '🕵';
  hideBtn.onclick = function() { hideChats(true); };

  document.querySelector('.im_dialogs_search').appendChild(hideBtn);


  Franz.injectCSS(path.join(__dirname, 'service.css'));
  Franz.loop(getMessages);
};
