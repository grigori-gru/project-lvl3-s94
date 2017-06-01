import fs from 'mz/fs';
import path from 'path';
import axios from './lib/axios';
import getName from '../src/pathAdapter';
import getResourses from './load';


export default (dir, url) => {
  const fileName = getName(url);
  const pathFile = path.join(dir, fileName);
  const { name } = path.parse(fileName);
  const folderName = path.join(dir, name);
  fs.mkdirSync(folderName);

  console.log(folderName);
  return axios.get(url)
    .then((res) => {
      const [resourseUrl, newRes] = getResourses(url, dir, res);
      console.log(newRes.data);
      fs.writeFile(pathFile, newRes.data);
    });
};
