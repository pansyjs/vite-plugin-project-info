import path from 'path';
import { createCode } from './helpers/createCode';

import type { Plugin } from 'vite'

interface IOptions {
  entry?: string;
}

const virtualModuleId = 'virtual:project-info'
const resolvedVirtualModuleId = '\0' + virtualModuleId;

const projectInfoPlugin: (opts: IOptions) => Plugin = (opts = {}) => {
  const { entry = path.resolve('src/main') } = opts;

  const lastEntry = entry.split('.')[0];

  return {
    name: 'vite-plugin-project-info',
    enforce: 'pre',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const packageJson = require(path.resolve('package.json'));

        const { name, version,  } = packageJson || {};

        if (name && version) {
          return createCode();
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

export default projectInfoPlugin;