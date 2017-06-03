import fs from 'mz/fs';
import axios from './lib/axios';
import { getName, getPath, getUrl } from './lib/pathAdapter';

export default (url, dir, homeUrl = '') => {
  const itemName = getName(url);
  const itemPath = getPath(dir, itemName);

  return axios.get(getUrl(url, homeUrl), { responseType: 'arraybuffer' })
    .then(res => fs.writeFile(itemPath, res.data))
    .catch(err => console.log(err));
};
