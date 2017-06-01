import path from 'path';
import url from 'url';

export default (uri) => {
  const { host, pathname } = url.parse(uri, true);
  const { ext, dir, name } = path.parse([host, pathname].join(''));
  const base = (path.join(dir, name)).replace(/\W+/g, '-');
  return base + (ext || '.html');
};
