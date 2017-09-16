const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "../css/[name].bundle.css",
  disable: process.env.NODE_ENV === "development"
});

// plugins
// const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
//   hash: true,
//   cache: false,
//   template: __dirname + '/react-signup/app/index.html',
//   filename: 'index.html',
//   inject: 'body'
// });

// definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false')),
  'process.env': {NODE_ENV: '"production"'}
});

const reactOutputPath = path.join(__dirname, "signup");
const CopyWebpackPluginConfig = new CopyWebpackPlugin([
  {from: './react-signup/html', to: reactOutputPath},
  {from: './react-signup/css', to: reactOutputPath + '/css'},
  {from: './react-signup/img', to: reactOutputPath + '/img'}
]);


const localElmSrc = './elmSrc/';
const elmSource = __dirname + '/elmSrc/';


// TODO - WEBPACK (or other) must handle building sass


module.exports = {
  // context: path.join(__dirname, 'app'),
  devServer: {
    publicPath: '_site',
    contentBase: path.join(__dirname, "_site"),
    compress: true,
    port: 9000,
    inline: true
  },
  entry: {
    reactSignup: ['./react-signup/app/index.js'],
    donationWidget: [localElmSrc + 'DonationWidget/index.js'],
    donationLog: [localElmSrc + 'DonationLog/index.js'],
    main: ['./_sass/main.scss'],
    memberUI: [localElmSrc + 'Flux/MemberUI/index.ts'],
  },
  output: {
    path: __dirname + "/js",
    filename: "bundle-[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: [{loader: "babel-loader"}]
      },
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/, /_site/],
        use: [{loader: 'elm-hot-loader'}, {
          loader: 'elm-webpack-loader'
        }]
      },
      {
        test: /\.tsx?$/,
        exclude: [/_site/],
        loader: 'ts-loader'
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader",
            options: { url: false }
          }, {
            loader: "sass-loader",
            options: {
              includePaths: [__dirname + "/_sass", 'node_modules']
            }
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
    ]
  },
  plugins: [
    // HtmlWebpackPluginConfig,
    extractSass,
    CopyWebpackPluginConfig, // comment this out when in dev-mode
    definePlugin
  ]
};
