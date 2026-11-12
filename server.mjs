import { createServer } from 'node:http';
import { handleRequest } from './src/server/http.mjs';

const port = Number(process.env.PORT || 8080);
const host = process.env.HOST || '127.0.0.1';
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535.');
}
await import('./scripts/build.mjs');
const server = createServer(handleRequest);
server.on('error', (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
server.listen(port, host, () => {
  console.log(`R³Coach: http://${host}:${port}`);
});
