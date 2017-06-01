import cheerio from 'cheerio';
import url from 'url';

const parseUrl = (mainHost, item) => {
  const urlObj = url.parse(item);
  const host = (urlObj.host || mainHost);
  urlObj.host = host;
  return url.format(urlObj);
};

export default (uri, dir, res) => {
  const { host } = url.parse(uri);
  const $ = cheerio.load(res.data);
  const tags = { script: 'src', link: 'href', img: 'src' };
  const result = Object.keys(tags).reduce((acc, tag) => {
    $(tag).map((i, el) => {
      const address = $(el).attr(tags[tag]);
      if (address) {
        const newAddress = parseUrl(host, address);
        $(el).attr(tags[tag], newAddress);
        // console.log($(el).attr(tags[tag]));
        acc.push(newAddress);
      }
      return el;
    });
    return acc;
  }, []);
  res.data = $.html();
  return [result, res];
};
