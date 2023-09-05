import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  target: 'esnext',
  format: ['cjs', 'esm'],
  sourcemap: true,
  clean: true,
  legacyOutput: true,
  dts: true,
})
