var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
// plugins
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  hash: true,
  cache: false,
  template: __dirname + '/react-signup/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

// definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false')),
  'process.env': {NODE_ENV: '"production"'}
});

var outputPath = path.join(__dirname, "signup");
var CopyWebpackPluginConfig = new CopyWebpackPlugin([
  { from:  './react-signup/css', to: outputPath + 'css' },
  { from: './react-signup/img', to: outputPath + 'img' }
]);


var elmSource = __dirname + '/elmSrc/';


module.exports = {
  // context: path.join(__dirname, 'app'),
  devServer: {
    publicPath: '_site',
    contentBase: path.join(__dirname, "_site"),
    compress: true,
    port: 9000
  },
  entry: [
    './react-signup/app/index.js'
  ],
  output: {
    path: outputPath,
    filename: "index_bundle.js"
  },
  module: {
    rules: [
      { test:/\.js$/,
        exclude: /node_modules/,
        use: [{loader: "babel-loader"}]
      },
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: {
          loader: 'elm-webpack-loader',
          options: {
            'cwd': elmSource,
          }
        }
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    CopyWebpackPluginConfig, // comment this out when in dev-mode
    definePlugin
  ]
};
