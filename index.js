var packageMeta = require('./package.json');
var util = require('util');

function prefixPaths(paths) {
  return paths.map(function(path) {
    return util.format('node_modules/%s/%s', packageMeta.name, path);
  });
}

module.exports = {
  getPaths: function(key) {
    var paths = packageMeta.paths;
    if(paths) {
      Object.keys(paths).forEach(function(k) {
        paths[k] = prefixPaths(paths[k]);
      });
    } else {
      paths = [];
    }
    if(!paths[key]) {
      throw new Error('`' + key + '` can’t be found in paths');
    }

    return paths[key];
  }
};
