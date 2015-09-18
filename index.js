var packageMeta = require('./package.json');
var util = require('util');

function prefixPaths(paths) {
  return paths.map(function(path) {
    return util.format('node_modules/%s/%s', packageMeta.name, path);
  });
}

module.exports = {
  getPaths: function() {
    var paths = packageMeta.paths;
    if(paths) {
      Object.keys(paths).forEach(function(k) {
        paths[k] = prefixPaths(paths[k]);
      });
    } else {
      paths = [];
    }
    return paths;
  }
};
