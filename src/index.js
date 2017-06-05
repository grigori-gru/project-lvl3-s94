import url from 'url';
import cheerio from 'cheerio';
import fs from 'mz/fs';
import debug from 'debug';
import axios from './lib/axios';
import { getUrl, getName, getDirName, getFilePath } from './lib/pathParse';

const loadFlag = debug('page-loader:load');
const dirFlag = debug('page-loader:dir');
const updFlag = debug('page-loader:upd');

const loadAndSave = (address, dir, homeUrl = '') => {
  const itemName = getName(address);
  const itemPath = getFilePath(dir, itemName);
  const newAddress = getUrl(address, homeUrl);

  return axios.get(newAddress, { responseType: 'arraybuffer' })
    .then((res) => {
      loadFlag('\x1b[36m', `file ${newAddress} loaded`);
      return fs.writeFile(itemPath, res.data);
    });
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

  return fs.mkdir(rootDir)
    .then(() => {
      dirFlag('\x1b[33m', `dir ${rootDir} is made`);
      return loadAndSave(address, dir);
    })
    .then(() => fs.readFile(pathFile, 'utf8'))
    .then((data) => {
      parsedData = parseHTML(data, rootDir);
      return fs.writeFile(pathFile, parsedData.newHtml);
    })
    .then(() => {
      updFlag('\x1b[34m', 'HTML updated');
      return Promise.all(parsedData.links.map(itemUrl =>
        loadAndSave(itemUrl, rootDir, address)));
    })
    .then(() => 0)
    .catch(() => 1);
};
