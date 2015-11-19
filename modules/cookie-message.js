var cookie = require('js-cookie');

exports.CookieMessage = {
  init: function() {
    var message = document.getElementById('global-cookie-message');
    var needsCookieMessage = (message && !cookie.get('seen_cookie_message'));

    if (needsCookieMessage) {
      message.style.display = 'block';
      cookie.set('seen_cookie_message', 'yes', { expires: 28 });
    }
  }
};
