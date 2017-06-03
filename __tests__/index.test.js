import nock from 'nock';
import os from 'os';
import fs from 'mz/fs';
import loadAndWrite from '../src/loadAndWrite';
import parseUrl from '../src/lib/parseHTML/parseUrl';
// import parseHTML from '../src/lib/parseHTML/';
import { getName, getPath, getFolder, getUrl } from '../src/lib/pathAdapter';

const url1 = 'http://hexlet.io/courses/';
const url2 = 'http://nothexlet.io/notcourses.js';
const testDir = '/var/tmp';

describe('test pathAdapter', () => {
  const fileName1 = 'hexlet-io-courses.html';
  const fileName2 = 'nothexlet-io-notcourses.js';

  test('test getPath', () => {
    expect(getPath(testDir, url1)).toBe('/var/tmp/hexlet-io-courses.html');
  });

  test('test getName', () => {
    expect(getName(url1)).toBe(fileName1);
    expect(getName(url2)).toBe(fileName2);
  });

  test('test getFolder', () => {
    expect(getFolder(testDir, url1)).toBe('/var/tmp/hexlet-io-courses_files');
  });

  test('test getUrl', () => {
    expect(getUrl('/lalala/dada.txt', url1))
      .toBe('http://hexlet.io/lalala/dada.txt');
    expect(getUrl(url2, url1)).toBe(url2);
  });
});

describe('test parsing html', () => {
  test('test url parse to local', () => {
    expect(parseUrl(testDir, '/lalala/dada.txt'))
      .toBe('file:///var/tmp/lalala-dada.txt');
    expect(parseUrl(testDir, url2))
      .toBe('file:///var/tmp/nothexlet-io-notcourses.js');
  });
});

describe('test loader', () => {
  let dir;

  beforeEach(() => {
    const data = 'data';
    dir = fs.mkdtempSync(`${os.tmpdir()}/`);
    nock(url1).get('/').reply(200, data);
  });

  test('test loadAndWrite correct', done =>
    loadAndWrite(url1, dir)
    .then(() => fs.readFile(getPath(dir, url1), 'utf8'))
      .then(data => expect(data).toBe(data))
      .then(done)
      .catch(done.fail));
});
