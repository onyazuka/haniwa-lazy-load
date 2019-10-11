var path = require('path');

module.exports = {
  entry: './lib/LazyLoad.js',
  output: {
    filename: 'LazyLoad.js',
    library: "LazyLoad",
    libraryTarget: 'umd',   // Important
    umdNamedDefine: true   // Important
  }
}
