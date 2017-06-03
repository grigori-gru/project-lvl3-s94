import fs from 'mz/fs';
import { getFolder, getPath } from './lib/pathAdapter';
import parseHTML from './lib/parseHTML/';
import loadAndWrite from './loadAndWrite';

export default (dir, url) => {
  const folder = getFolder(dir, url);
  const pathFile = getPath(dir, url);

  let resourseUrl;
  let newData;

  return fs.mkdir(folder)
    .then(() => loadAndWrite(url, dir))
    .then(() => fs.readFile(pathFile, 'utf8'))
    .then((data) => {
      [resourseUrl, newData] = parseHTML(data, folder);
      return fs.writeFile(pathFile, newData);
    })
    .then(() =>
      Promise.all(resourseUrl.map(itemUrl =>
        loadAndWrite(itemUrl, folder, url))))
    .catch(err => console.log(err));
};
