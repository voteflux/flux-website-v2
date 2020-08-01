const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const devMode = process.env.NODE_ENV === "development"

if (devMode) { console.log(">>> WEBPACK RUNNING IN DEV MODE <<<"); }

const extractSass = new ExtractTextPlugin({
  filename: "../css/[name].bundle.css",
  disable: false
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
  __DEV__: JSON.stringify(devMode),
  // __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false')),
  'process.env.NODE_ENV': process.env.NODE_ENV ? JSON.stringify(process.env.NODE_ENV) : '"production"',
  __DEV_HOSTNAME__: devMode ? `"${process.env.DEV_HOSTNAME || "http://vm-dev-177:52100"}"` : null,
  __RECAPTCHA_SITE_KEY__: JSON.stringify(process.env.RECAPTCHA_SITE_KEY) || "6LfIUrgZAAAAAKgk0qHACeb8jx_Fjz8Y5YW8Nqf7",
});

const reactOutputPath = path.join(__dirname, "signup");
const CopyWebpackPluginConfig = new CopyWebpackPlugin([
  {from: './react-signup/html', to: reactOutputPath},
  {from: './react-signup/css', to: reactOutputPath + '/css'},
  {from: './react-signup/img', to: reactOutputPath + '/img'}
]);


const localElmSrc = './elmSrc/';
const elmSource = __dirname + '/elmSrc/';


const elmLoaders = devMode
  ? [{loader: 'elm-hot-loader'}, {loader: 'elm-webpack-loader'}]
  : [{loader: 'elm-webpack-loader'}];


// TODO - WEBPACK (or other) must handle building sass


const config = {
  // context: path.join(__dirname, 'app'),
  devServer: {
    publicPath: '_site',
    contentBase: path.join(__dirname, "_site"),
    watchContentBase: true,
    compress: true,
    port: 9999,
    inline: true,
    hot: true,
    host: '127.0.0.1',
  },
  externals: {
    grecaptcha: {}
  },
  entry: {
    reactSignup: ['./react-signup/app/index.js'],
    donationWidget: [localElmSrc + 'DonationWidget/index.js'],
    donationLog: [localElmSrc + 'DonationLog/index.js'],
    mainCss: ['./_sass/main.scss'],
    // memberUI: [localElmSrc + 'Flux/MemberUI/index.ts'],
    // fluxScripts: [localElmSrc + 'Flux/MemberUI/scripts.ts'],
    main: ['./src/web/main.js'],
    common: ['./src/web/common.js'],
    graphs: ['./src/web/graphs-ng.js'],
    // donationGraphLogic: ['./src/web/donationGraphLogic.js'],
  },
  output: {
    path: __dirname + "/js",
    filename: "bundle-[name].js"
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: [{loader: "babel-loader",
          query: {
            presets:[ 'es2015', 'react', 'stage-2' ],
          }}]
      },
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/, /_site/],
        use: elmLoaders
      },
      {
        test: /\.tsx?$/,
        exclude: [/_site/],
        loader: 'ts-loader'
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
          {
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
    definePlugin,
    CopyWebpackPluginConfig
  ],
  // devtool: devMode ? 'eval-source-map' : false
};

if (devMode) {  // dev build
  config.plugins.push(new webpack.SourceMapDevToolPlugin({}))
} else {  // production build
}

module.exports = config;
