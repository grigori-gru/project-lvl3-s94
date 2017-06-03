import cheerio from 'cheerio';
import parseUrl from './parseUrl';

export default (res, dir) => {
  const $ = cheerio.load(res);
  const tags = { script: 'src', link: 'href', img: 'src' };

  const result = Object.keys(tags)
    .reduce((acc, tag) => {
      $(tag).map((i, el) => {
        const address = $(el).attr(tags[tag]);
        if (address) {
          const newAddress = parseUrl(dir, address);
          $(el).attr(tags[tag], newAddress);
          acc.push(address);
        }
        return el;
      });
      return acc;
    }, []);

  return [result, $.html()];
};
