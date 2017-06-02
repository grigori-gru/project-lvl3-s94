import path from 'path';
import url from 'url';

const getName = (uri) => {
  const { host, pathname } = url.parse(uri, true);
  const { ext, dir, name } = path.parse([host, pathname].join(''));
  const base = (path.join(dir, name)).replace(/\W+/g, '-');
  return base + (ext || '.html');
};

const getPath = (dir, name) => path.join(dir, name);

const getFolder = (dir, fileName) => {
  const { name } = path.parse(fileName);
  return getPath(dir, `${name}_files`);
};

const getBase = (uri) => {
  const { protocol, host } = url.parse(uri);
  return url.format({ protocol, host });
};

const getUrl = (base, uri) => {
  const urlObj = url.parse(uri);
  const result = urlObj.protocol ? uri : url.resolve(getBase(base), uri);
  return result;
};

export default { getBase, getName, getPath, getFolder, getUrl };
