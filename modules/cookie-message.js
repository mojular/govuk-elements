/*
 Cookie methods
 ==============
 Usage:
 Setting a cookie:
 Mojular.Modules.Cookie.set('foo', 'bar', { days: 30 });

 Reading a cookie:
 Mojular.Modules.Cookie.get('foo');

 Removing a cookie:
 Mojular.Modules.Cookie.remove('foo');
 */

var Cookie = function() {};

Cookie.prototype = {
  set: function(name, value, options) {
    if (typeof options === 'undefined') {
      options = {};
    }
    var cookieString = name + '=' + value + '; path=/';
    var date;

    if (options.days) {
      date = new Date();
      date.setTime(date.getTime() + (options.days * 24 * 60 * 60 * 1000));
      cookieString = cookieString + '; expires=' + date.toGMTString();
    }
    if (document.location.protocol === 'https:') {
      cookieString = cookieString + '; Secure';
    }
    document.cookie = cookieString;
  },

  get: function(name) {
    var nameEQ = name + '=';
    var cookies = document.cookie.split(';');
    var i, len, cookie;

    for (i = 0, len = cookies.length; i < len;) {
      cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
      i += 1;
    }
    return null;
  },

  remove: function(name) {
    if (this.get(name) === undefined) {
      return false;
    }

    // Must not alter options, thus extending a fresh object...
    this.set(name, '', {days: -1});
    return !this.get(name);
  }
};

var cookie = new Cookie();

module.exports = {
  Cookie: cookie,
  CookieMessage: {
    init: function() {
      var message = document.getElementById('global-cookie-message');
      var needsCookieMessage = (message && cookie.get('seen_cookie_message') === null);

      if (needsCookieMessage) {
        message.style.display = 'block';
        cookie.set('seen_cookie_message', 'yes', {days: 28});
      }
    }
  }
};
