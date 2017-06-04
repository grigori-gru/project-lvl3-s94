import nock from 'nock';
import os from 'os';
import fs from 'mz/fs';
import path from 'path';
import { getName, getFilePath, getDirName, getUrl } from '../src/lib/pathParse';
import pageloader from '../src/';

const url1 = 'http://hexlet.io/courses/';
const url2 = 'http://nothexlet.io/notcourses.js';
const testDir = '/var/tmp';

describe('test pathAdapter', () => {
  const fileName1 = 'hexlet-io-courses.html';
  const fileName2 = 'nothexlet-io-notcourses.js';

  test('test getPath', () => {
    expect(getFilePath(testDir, url1)).toBe('/var/tmp/hexlet-io-courses.html');
  });

  test('test getName', () => {
    expect(getName(url1)).toBe(fileName1);
    expect(getName(url2)).toBe(fileName2);
  });

  test('test getFolder', () => {
    expect(getDirName(testDir, url1)).toBe('/var/tmp/hexlet-io-courses_files');
  });

  test('test getUrl', () => {
    expect(getUrl('/lalala/dada.txt', url1))
      .toBe('http://hexlet.io/lalala/dada.txt');
    expect(getUrl(url2, url1)).toBe(url2);
  });
});

describe('test loader', () => {
  let dir;
  const testPath = './__tests__/__fixtures__';
  const htmlBefore = path.resolve(testPath, 'html_before_parse.html');
  const data = fs.readFileSync(htmlBefore, 'utf8');
  const resourses = [
    'cdn2-hexlet-io-attachments-8bb56fd2beb3e373d72ebece2bad1c55d5939a8d-store-1f37bdd55104906c2047752c5b5fff0e76638e3de7388037b29f15ce6da7-image.png',
    'polyfill-io-v2-polyfill-min.js',
    'en-hexlet-io-lessons.rss',
  ];

  beforeEach(() => {
    dir = fs.mkdtempSync(`${os.tmpdir()}/`);
    nock('http://hexlet.io').get('/courses/').reply(200, data);
  });

  test('test load ', done =>
    pageloader(dir, url1)
      .then(result => expect(result).toBe('Done!'))
      .then(() => fs.exists(getFilePath(dir, url1)))
      .then(result => expect(result).toBe(true))
      .then(() =>
        Promise.all(resourses.map(item =>
          fs.exists(path.resolve(dir, 'hexlet-io-courses_files', item)))))
      .then(result => expect(result).not.toContain(false))
      .then(done)
      .catch(done.fail));

  // test('test error', done =>
  //   pageloader(dir, url2)
  //     .then(result => expect(result).toBe('Done!'))
  //     .then(done)
  //     .catch(done.fail));
});
