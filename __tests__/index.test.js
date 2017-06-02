// import nock from 'nock';
import os from 'os';
import fs from 'mz/fs';
// import path from 'path';
import pageloader from '../src/';
import pathAdapter from '../src/lib/pathAdapter';


const url = 'http://ru.hexlet.io/courses/';
// const data = 'data';
const dir = fs.mkdtempSync(`${os.tmpdir()}/`);
const pathFile = pathAdapter.getDir(dir, pathAdapter.getName(url));

describe('test', () => {
  test('test resourse load', done =>
    pageloader(dir, url)
    .then(() => fs.readFile(pathFile, 'utf8'))
      .then(data => expect(data).not.toBe(undefined))
      .then(done)
      .catch(done.fail));
});

// describe('test', () => {
//   beforeEach(() => {
//     nock(url).get('/').reply(200, data);
//   });
//
//   test('test page loader', (done) => {
//     const fileName = getName(url);
//     console.log(fileName);
//     const pathFile = path.join(dir, fileName);
//     return pageloader(dir, url)
//       .then(() => fs.readFile(pathFile, 'utf8'))
//       .then(text => expect(text).toBe('data'))
//       .then(done)
//       .catch(done.fail);
//   });
// });
