import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';

await build({
  absWorkingDir: fileURLToPath(new URL('../', import.meta.url)),
  entryPoints: ['src/client/app.mjs'],
  outfile: 'public/app.mjs',
  bundle: true,
  platform: 'browser',
  format: 'esm',
  target: 'es2022',
  sourcemap: true,
  logLevel: 'info',
});
