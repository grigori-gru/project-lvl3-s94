import nock from 'nock';
import os from 'os';
import fs from 'mz/fs';
import path from 'path';
import pageloader from '../src/';
import getName from '../src/pathAdapter';


const url = 'http://hexlet.io/courses/';
const data = 'data';
const dir = fs.mkdtempSync(`${os.tmpdir()}/`);

describe('test', () => {
  test('test cheerio', done =>
    pageloader(dir, url)
      .then(() => expect(1).toBe(1))
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
