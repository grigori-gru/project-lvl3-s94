import fs from 'mz/fs';
import axios from './lib/axios';
import pathAdapter from './lib/pathAdapter';
import getResourses from './load';

const write = (folder, item) => {
  const itemName = pathAdapter.getName(item);
  const itemPath = pathAdapter.getDir(folder, itemName);
  return axios({
    method: 'get',
    url: item,
    baseURL: 'http://hexlet.io',
    responseType: 'arraybuffer',
  }).then(res =>
    fs.writeFile(itemPath, res.data))
    .catch(err => err);
};

export default (dir, url) => {
  const fileName = pathAdapter.getName(url);
  const pathFile = pathAdapter.getDir(dir, fileName);
  const folderName = pathAdapter.getFolder(dir, fileName);
  fs.mkdirSync(folderName);

  return axios.get(url)
    .then((res) => {
      const [resourseUrl, newRes] = getResourses(url, folderName, res);
      fs.writeFile(pathFile, newRes.data);
      return resourseUrl;
    })
    .then(res => Promise.all(res.map(item => write(folderName, item))));
};
