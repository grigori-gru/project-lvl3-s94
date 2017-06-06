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
      .then((res) => {
        console.log(
          '\n\n\t\tPage',
          '\x1b[33m', `${url}`, '\x1b[0m',
          'and resourses loaded successfully to',
          '\x1b[33m', `${dir}`, '\x1b[0m',
          '!!!\n\n',
        );
        process.exit(res);
      })
      .catch((err) => {
        console.log('\x1b[31m', 'Houston, we have a problem...', '\x1b[0m');
        const errCode = err.response ? err.response.status : err.code;
        const text = {
          EEXIST: 'Folder is already exists, remove it or choose another directory!',
          ENOENT: `No such directory ${dir} in your file system, just try to choose another!`,
          404: `Request to address '${url}' got error, just try to check it!`,
        };
        console.error('\x1b[33m', text[errCode] || 'UnKnown error.', '\x1b[0m');
        process.exit(1);
      });
  });

program.parse(process.argv);
