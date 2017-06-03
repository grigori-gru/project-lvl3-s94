import fs from 'mz/fs';
import axios from './lib/axios';
import { getName, getPath, getUrl } from './lib/pathAdapter';

export default (url, dir, homeUrl = '') => {
  const itemName = getName(url);
  const itemPath = getPath(dir, itemName);
  const options = {
    method: 'get',
    url: getUrl(url, homeUrl),
    responseType: 'arraybuffer',
  };

  return axios(options)
    .then(res => fs.writeFile(itemPath, res.data))
    .catch(err => console.log(err));
};
