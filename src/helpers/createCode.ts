import fs from 'fs';
import path from 'path';

export function createCode() {
  const packageJson = require(path.resolve('package.json'));

  let tpl = fs.readFileSync(path.resolve(__dirname, './template.tpl'), { encoding: 'utf8' });
  const pkgMatchs = tpl.match(/{pkg\.[^{}]*}/g);
  pkgMatchs?.forEach((m) => {
    const fieldName = m.match(/{pkg\.(.*)}/)?.[1];
    tpl = tpl.replace(new RegExp(m, 'g'), packageJson[fieldName || ''] || '');
  });

  return tpl;
}