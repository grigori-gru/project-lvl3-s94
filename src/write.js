import fs from 'mz/fs';
import getPath from './repl';

export default (dir, url, data) => {
  const path = getPath(dir, url);
  fs.writeFile(path, data);
};
