import fs from 'mz/fs';
import axios from './lib/axios';
import pathAdapter from './lib/pathAdapter';
import getResUpdHTML from './getResUpdHTML';
import loadAndWrite from './loadAndWrite';

export default (dir, url) => {
  const fileName = pathAdapter.getName(url);
  const pathFile = pathAdapter.getPath(dir, fileName);
  const folderName = pathAdapter.getFolder(dir, fileName);
  fs.mkdirSync(folderName);

  return axios.get(url)
    .then((res) => {
      const [resourseUrl, newRes] = getResUpdHTML(url, folderName, res);
      fs.writeFile(pathFile, newRes.data);
      return resourseUrl;
    })
    .then((res) => {
      fs.writeFile(pathAdapter.getPath(dir, 'res.txt'), res.join('\n\n'));
      return res;
    })
    .then(res => Promise.all(res.map(item => loadAndWrite(url, folderName, item))))
    .catch(err => console.log(err));
};
