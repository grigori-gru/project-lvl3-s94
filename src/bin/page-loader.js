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
          case 'EEXIST':
            console.error('Folder is already exists, remove it or choose another directory!');
            break;
          case 'ENOENT':
            console.error(`No such directory '${dir}' in your file system, just try to choose another!`);
            break;
          case 404:
            console.error(`Request to address '${err.config.url}' got error ${errCode}, just try to check it!`);
            break;
          default:
            console.log(`Code of error: ${errCode}.`);
        }
        process.exit(1);
      });
  });

program.parse(process.argv);
