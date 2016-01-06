/* If the current page shows errors, set the focus to the error messages */
/* globals require, exports */

'use strict';

var $ = require('jquery');

exports.FocusErrorSummary = {
  init: function() {
    var $errorSummary = $('.error-summary');
    // If there is an error summary, set focus to the summary
    if ($errorSummary.length === 1) {
      $errorSummary.focus();
      $errorSummary.on('click', 'a', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        var id = href.substr(href.indexOf('#'));
        $(id).focus();
      });
    }
    // Otherwise, set focus to the field with the error
    else {
      $('.error input:first').focus();
    }
  }
};
