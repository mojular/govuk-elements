var merge = require('merge');

module.exports = merge(
  require('./cookie-message'),
  require('./skip-to-content')
);
