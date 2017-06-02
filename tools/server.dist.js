const express = require('express');
const path = require('path');
const open = require('open');
const chalk = require('chalk');
const compression = require('compression');

const port = 3000;
const app = express();

console.log(chalk.blue(`Staring web server at PORT: ${port}`));

app.use(compression());
app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
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
