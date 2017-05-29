/**
 * Created by raphael on 23/04/17.
 */
import jsf from 'json-schema-faker';
import fs from 'fs';
import chalk from 'chalk';
import schema from '../spec/mockDataSchema';

const json = JSON.stringify(jsf(schema), null, 2);
fs.writeFile('./src/api/db.json', json, err =>
  console.log(err ? chalk.red(err) : chalk.green('Mock data generated.')));
