import path from 'path';
import url from 'url';

const getName = (uri) => {
  const { host, pathname } = url.parse(uri, true);
  const { ext, dir, name } = path.parse([host, pathname].join(''));
  const base = (path.join(dir, name)).replace(/\W+/g, '-');
  return base + (ext || '.html');
};

const getDir = (dir, name) => path.join(dir, name);

const getFolder = (dir, fileName) => {
  const { name } = path.parse(fileName);
  return getDir(dir, `${name}_files`);
};

export default { getName, getDir, getFolder };
