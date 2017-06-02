import fs from 'mz/fs';
import axios from './lib/axios';
import pathAdapter from './lib/pathAdapter';

export default (url, folder, item) => {
  const itemName = pathAdapter.getName(item);
  const itemPath = pathAdapter.getPath(folder, itemName);
  const options = {
    method: 'get',
    url: pathAdapter.getUrl(url, item),
    responseType: 'arraybuffer',
  };

  return axios(options)
    .then(res => fs.writeFile(itemPath, res.data))
    .catch(err => err);
};
