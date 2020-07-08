const config = require('flarum-webpack-config');

var merge = require('webpack-merge');

const myConfig = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};



module.exports = merge(config(), myConfig);