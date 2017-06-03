import url from 'url';
import { getPath } from '../pathAdapter';

export default (dir, item) => {
  const itemObj = url.parse(item);
  const pathname = getPath(dir, item);
  const newObj = {
    protocol: 'file',
    pathname,
    host: null,
    hostname: null,
  };
  return url.format({ ...itemObj, ...newObj });
};
