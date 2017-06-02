import cheerio from 'cheerio';
import url from 'url';
import pathAdapter from './lib/pathAdapter';

const parseUrl = (dir, item) => {
  const itemObj = url.parse(item);
  const pathname = pathAdapter.getDir(dir, pathAdapter.getName(item));
  const newObj = {
    protocol: 'file',
    pathname,
    host: null,
    hostname: null,
  };
  return url.format({ ...itemObj, ...newObj });
};

export default (uri, dir, res) => {
  const $ = cheerio.load(res.data);
  const tags = { script: 'src', link: 'href', img: 'src' };
  const result = Object.keys(tags).reduce((acc, tag) => {
    $(tag).map((i, el) => {
      const address = $(el).attr(tags[tag]);
      if (address) {
        parseUrl(dir, address);
        const newAddress = address;
        $(el).attr(tags[tag], newAddress);
        acc.push(newAddress);
      }
      return el;
    });
    return acc;
  }, []);
  res.data = $.html();
  return [result, res];
};
