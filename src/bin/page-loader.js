#!/usr/bin/env node
import program from 'commander';
import load from '..';

program
  .version('0.0.1')
  .description('Load page.')
  .option('--output')
  .arguments('<first_config> <second_config>')
  .action((path, url) => {
    load(path, url);
  });

program.parse(process.argv);
