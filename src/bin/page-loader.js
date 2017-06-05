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
      .catch((err) => {
        console.log('Houston, we have a problem...');
        const errCode = err.response ? err.response.status : err.code;
        switch (errCode) {
          case 1:
            console.error('Folder is already exists, remove it or choose another directory!');
            break;
          case 2:
            console.error('No such directory in your file system, just try to choose another!');
            break;
          case 3:
            console.error(`Request to address '${url}' got error, just try to check it!`);
            break;
          default:
            console.log('UnKnown error.');
        }
        process.exit(err);
      });
  });

program.parse(process.argv);
