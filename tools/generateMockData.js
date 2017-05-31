/**
 * Created by raphael on 23/04/17.
 */
const jsf = require('json-schema-faker');
const fs = require('fs');
const chalk = require('chalk');
const schema = require('../spec/mockDataSchema');

const json = JSON.stringify(jsf(schema), null, 2);
fs.writeFile('./src/api/db.json', json, err =>
  console.log(err ? chalk.red(err) : chalk.green('Mock data generated.')));
