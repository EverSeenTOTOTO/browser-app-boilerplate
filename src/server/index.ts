import path from 'path';
import fs from 'fs';
import express from 'express';

// hypothesis: client assets to be in the same directory
export const createServer = async () => {
  const server = express();
  const { render } = await import(path.join(__dirname, 'index.server.js'));
  const template = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');

  server.use(express.static(__dirname, {
    index: false,
  }));

  server.get(/^\/api\//, (_, res) => {
    setTimeout(() => res.end('react and vite!'), 1000);
  });

  server.get('*', (req, res) => render({
    req, res, template,
  }));

  return server;
};

const port = 3000;

createServer()
  .then((server) => {
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch(console.error);
