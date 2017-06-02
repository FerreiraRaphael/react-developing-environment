const express = require('express');
const path = require('path');
const open = require('open');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
const isWindowsBash = require('is-windows-bash');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const port = 3000;
const app = express();
const bundler = webpack(config);

console.log(chalk.blue(`Staring web server at PORT: ${port}`));

const windowsSettings = isWindowsBash()
  ? {
    lazy: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true,
    },
  }
  : {};

const devMiddlewareConfig = {
  hot: true,
  stats: {
    colors: true,
  },
  historyApiFallback: true,
  ...windowsSettings,
};

app.use(webpackDevMiddleware(bundler, devMiddlewareConfig));

const hotMiddlewareConfig = {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
};

app.use(webpackHotMiddleware(bundler, hotMiddlewareConfig));

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
