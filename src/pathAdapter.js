import path from 'path';
import url from 'url';

export default (dir, uri) => {
  const { host, pathname } = url.parse(uri);
  const fileName = (pathname === '/' ? host : host + pathname)
    .replace(/\W+/g, '-');
  return path.join(dir, `${fileName}.html`);
};
