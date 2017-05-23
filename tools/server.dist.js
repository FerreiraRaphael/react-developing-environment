import express from 'express';
import path from 'path';
import open from 'open';
import chalk from 'chalk';
import compression from 'compression';

const port = 3000;
const app = express();

console.log(chalk.blue(`Staring web server at PORT: ${port}`));

app.use(compression());
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
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
