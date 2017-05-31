const express = require('express');
const path = require('path');
const open = require('open');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('./webpack.config.dev');

const port = 3000;
const app = express();
const bundler = webpack(config);

console.log(chalk.blue(`Staring web server at PORT: ${port}`));

app.use(
  require('webpack-dev-middleware')(bundler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
      colors: true,
    },
    historyApiFallback: true,
  }));

app.use(require('webpack-hot-middleware')(bundler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(chalk.red(err));
  } else {
    const url = `http://localhost:${port}`;
    console.log(`Server listening at ${url}`);
    open(url);
  }
});
