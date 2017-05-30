// import nock from 'nock';
import pageloader from '../src/';

test('JSON equal expected data', () => {
  // const host = 'https://hexlet.io/courses';
  // nock(host).get('/').reply(200);
  expect(pageloader()).toEqual(1);
});
