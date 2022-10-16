import path from 'path';
import fs from 'fs';
import express from 'express';

// hypothesis: client assets to be in the same directory
export const createServer = async () => {
  const server = express();
  const { render } = await import(/* webpackIgnore: true */path.join(__dirname, 'index.server.js'));
  const template = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');

  server.use(express.static(__dirname, {
    index: false,
  }));

  server.get(/^\/api\//, (_, res) => {
    res.send('vue and webpack!');
  });

  server.get('*', async (req, res) => {
    const { html } = await render({ req, res, template });

    res.setHeader('Content-Type', 'text/html');
    res.end(html);
  });

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
