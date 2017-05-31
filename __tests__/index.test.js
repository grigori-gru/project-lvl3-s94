import nock from 'nock';
import os from 'os';
import fs from 'mz/fs';
import httpAdapter from 'axios/lib/adapters/http';
import axios from 'axios';
import pageloader from '../src/';
import getPath from '../src/pathAdapter';

const url = 'http://hexlet.io';
const data = 'data';

axios.defaults.host = url;
axios.defaults.adapter = httpAdapter;

describe('test', () => {
  const dir = fs.mkdtempSync(`${os.tmpdir()}/`);
  nock(url).get('/').reply(200, data);

  test('test page loader', (done) => {
    const pathFile = getPath(dir, url);
    return pageloader(dir, url)
      .then(() => fs.readFile(pathFile, 'utf8'))
      .then(text => expect(text).toBe('data'))
      .then(done)
      .catch(done.fail);
  });
});
