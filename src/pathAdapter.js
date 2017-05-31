import path from 'path';

export default (dir, url) => {
  const fileName = url.replace(/(^\w+:|^)\/\//, '').replace(/\W+/g, '-');
  return path.join(dir, `${fileName}.html`);
};
