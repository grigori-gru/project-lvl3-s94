import url from 'url';
import cheerio from 'cheerio';
import fs from 'mz/fs';
import Listr from 'listr';
import debug from 'debug';
import axios from './lib/axios';
import { getUrl, getName, getDirName, getFilePath } from './lib/pathParse';

const loadFlag = debug('page-loader:load');
const dirFlag = debug('page-loader:dir');
const updateFlag = debug('page-loader:update');

const loadAndSave = (address, dir, homeUrl = '') => {
  const itemName = getName(address);
  const itemPath = getFilePath(dir, itemName);
  const newAddress = getUrl(address, homeUrl);

  return axios.get(newAddress, { responseType: 'arraybuffer' })
    .then(res => fs.writeFile(itemPath, res.data))
    .then(() => loadFlag('\x1b[33m', `page ${newAddress} is loaded`));
};

const parseUrl = (dir, item) => {
  const itemObj = url.parse(item);
  const pathname = getFilePath(dir, item);
  const newObj = {
    protocol: 'file',
    pathname,
    host: null,
    hostname: null,
  };

  return url.format({ ...itemObj, ...newObj });
};

const parseHTML = (res, dir) => {
  const $ = cheerio.load(res);
  const tags = { script: 'src', link: 'href', img: 'src' };

  const links = Object.keys(tags)
    .reduce((acc, tag) => {
      $(tag).each((i, el) => {
        const address = $(el).attr(tags[tag]);
        if (address) {
          const newAddress = parseUrl(dir, address);
          $(el).attr(tags[tag], newAddress);
          acc.push(address);
        }
        return el;
      });
      return acc;
    }, []);

  return { links, newHtml: $.html() };
};

export default (dir, address) => {
  const rootDir = getDirName(dir, address);
  const pathFile = getFilePath(dir, address);
  let parsedData;

  const tasks = new Listr([
    {
      title: 'Making directory',
      task: () =>
        fs.mkdir(rootDir)
          .then(() => dirFlag('\x1b[33m', `dir ${rootDir} is made`)),
    },
    {
      title: 'Load page main page',
      task: () => loadAndSave(address, dir),
    },
    {
      title: 'Parsing data',
      task: () =>
        fs.readFile(pathFile, 'utf8')
          .then((data) => {
            parsedData = parseHTML(data, rootDir);
            return fs.writeFile(pathFile, parsedData.newHtml);
          })
          .then(() => updateFlag('\x1b[33m', 'HTML updated')),
    },
    {
      title: 'Load resourses',
      task: () =>
        Promise.all(parsedData.links.map(itemUrl =>
          loadAndSave(itemUrl, rootDir, address))),
    },
  ]);

  return tasks.run()
    .then(() => 0)
    .catch(err => Promise.reject(err));
};
