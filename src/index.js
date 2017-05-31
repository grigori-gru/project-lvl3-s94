import axios from 'axios';
import fs from 'mz/fs';
import getPath from './pathAdapter';

export default (dir, url) => {
  const pathFile = getPath(dir, url);
  return axios.get(url)
    .then(res => fs.writeFile(pathFile, res.data));
};
