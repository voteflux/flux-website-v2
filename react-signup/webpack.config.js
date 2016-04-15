var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// plugins
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

// definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});


module.exports = {
  entry: [
    './app/index.js'
  ],
  output: {
    path: '../_sign-up/',
    filename: "index_bundle.js"
  },
  module: {
    loaders: [
      { test:/\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig, definePlugin]
};
