import fs from 'fs';
import path from 'path';

import type { Plugin } from 'vite'

export interface IOptions {
  entry?: string;
}

export function projectInfo(opts: IOptions = {}): Plugin {
  const { entry = path.resolve('src/main') } = opts;
  const lastEntry = entry.replace(/\.(tsx?|jsx?)$/, '');

  const virtualModuleId = 'virtual:project-info'
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'vite-plugin-project-info',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const packageJson = require(path.resolve('package.json'));

        const { name, version } = packageJson || {};

        if (name && version) {
          let tpl = fs.readFileSync(path.resolve(__dirname, './template.tpl'), { encoding: 'utf8' });
          const pkgMatchs = tpl.match(/{pkg\.[^{}]*}/g);
          pkgMatchs?.forEach((m) => {
            const fieldName = m.match(/{pkg\.(.*)}/)?.[1];
            tpl = tpl.replace(new RegExp(m, 'g'), packageJson[fieldName || ''] || '');
          });

          return tpl;
        }

        return `
          export {};
        `
      }
    },
    transform(code, id) {
      if (id.includes(path.resolve(lastEntry).replace(/\\/g, '/'))) {
        return {
          code: `import '${virtualModuleId}';\n${code}`,
          map: this.getCombinedSourcemap(),
        };
      }
    },
  }
}
