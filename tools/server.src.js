import express from 'express';
import path from 'path';
import open from 'open';
import chalk from 'chalk';
import webpack from 'webpack';
import config from './webpack.config.dev';

const port = 3000;
const app = express();
const compiler = webpack(config);

console.log(chalk.blue(`Staring web server at PORT: ${port}`));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/users', (req, res) => {
  // Hard coding for simplicity, Pretend this hits a real database
  res.json([
    { id: 1, firstName: 'Bob', lastName: 'Smith', email: 'bob@gmail.com' },
    { id: 2, firstName: 'Tammy', lastName: 'Norton', email: 'tammy@gmail.com' },
    { id: 3, firstName: 'Tina', lastName: 'Lee', email: 'tina@gmail.com' },
  ]);
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
