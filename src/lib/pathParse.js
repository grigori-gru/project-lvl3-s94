import path from 'path';
import url from 'url';

export const getName = (uri) => {
  const newUrl = uri[0] === '/' ? uri.slice(1) : uri;
  const { host, pathname } = url.parse(newUrl, true);
  const { ext, dir, name } = path.parse([host, pathname].join(''));
  const base = (path.join(dir, name)).replace(/\W+/g, '-');
  return `${base}${(ext || '.html')}`;
};

export const getFilePath = (dir, uri) => path.join(dir, getName(uri));

export const getDirName = (dir, uri) => {
  const { name } = path.parse(getName(uri));
  return path.join(dir, `${name}_files`);
};

export const getUrl = (uri, mainUrl) => {
  const { protocol, host } = url.parse(mainUrl);
  const base = url.format({ protocol, host });
  const { hostname } = url.parse(uri);
  return hostname ? uri : url.resolve(base, uri);
};
