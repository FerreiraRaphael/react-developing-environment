/**
 * Created by raphael on 19/04/17.
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

// const host = process.env.HOST || 'localhost';
// const port = process.env.PORT || 3000;
const sourcePath = path.join(__dirname, '../src');

// const stats = {
//   assets: true,
//   children: false,
//   chunks: false,
//   hash: false,
//   modules: false,
//   publicPath: false,
//   timings: true,
//   version: false,
//   warnings: true,
//   colors: {
//     green: '\u001b[32m',
//   },
// };

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    // activate HMR for React
    'react-hot-loader/patch',

    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',

    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    // 'webpack/hot/only-dev-server',

    path.resolve(sourcePath, 'index'),
    // the entry point of our app
  ],
  target: 'web',
  output: {
    path: sourcePath,
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [

    // setting production environment will strip out
    // some of the development code from the app
    // and libraries
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('development') },
    }),

    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
    }),

    // make hot reloading work
    new webpack.HotModuleReplacementPlugin(),
    // show module names instead of numbers in webpack stats
    new webpack.NamedModulesPlugin(),
    // don't spit out any errors in compiled assets
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: [
      '.webpack-loader.js',
      '.web-loader.js',
      '.loader.js',
      '.js',
      '.jsx',
    ],
    modules: [path.resolve(__dirname, '../node_modules'), sourcePath],
  },
};
