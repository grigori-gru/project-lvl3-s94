import fs from 'mz/fs';
import axios from './lib/axios';
import getPath from './pathAdapter';

export default (dir, url) => {
  const pathFile = getPath(dir, url);
  return axios.get(url)
    .then(res => fs.writeFile(pathFile, res.data));
};
