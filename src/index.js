import fs from 'mz/fs';
import debug from 'debug';
import { getFolder, getPath } from './lib/pathAdapter';
import parseHTML from './lib/parseHTML/';
import loadAndWrite from './loadAndWrite';

const flag = debug('page-loader');

export default (dir, url) => {
  const folder = getFolder(dir, url);
  const pathFile = getPath(dir, url);

  let resourseUrl;
  let newData;

  return fs.mkdir(folder)
    .then(() => loadAndWrite(url, dir))
    .then(() => fs.readFile(pathFile, 'utf8'))
    .then((data) => {
      flag(`file ${pathFile} saved`);
      [resourseUrl, newData] = parseHTML(data, folder);
      console.log(resourseUrl);
      return fs.writeFile(pathFile, newData);
    })
    .then(() =>
      Promise.all(resourseUrl.map(itemUrl =>
        loadAndWrite(itemUrl, folder, url))))
    .catch(err => console.log(err));
};
