#!/usr/bin/env node
import program from 'commander';
import load from '..';

program
  .version('0.0.1')
  .description('Load page.')
  .option('--output')
  .arguments('<first_config> <second_config>')
  .action((dir, url) => {
    load(dir, url)
      .then(() =>
        console.log(`\n\n\t\tPage ${url} and resourses loaded successfully to ${dir}!!!\n\n`))
      .catch((err) => {
        console.log('\x1b[31m', 'Houston, we have a problem...');
        const text = {
          1: 'Folder is already exists, remove it or choose another directory!',
          2: `No such directory ${dir} in your file system, just try to choose another!`,
          3: `Request to address '${url}' got error, just try to check it!`,
        };
        console.error('\x1b[33m', text[err] || 'UnKnown error.');
        process.exit(err);
      });
  });

program.parse(process.argv);
