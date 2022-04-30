import path from 'path';
import fs from 'fs';
import express from 'express';

const server = express();
const port = 3000;

const serverEntry = path.join(__dirname, 'index.server.js');
const template = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
// eslint-disable-next-line import/no-dynamic-require, @typescript-eslint/no-var-requires
const { render } = require(serverEntry);

server.use(express.static(__dirname, {
  index: false,
}));

server.get('*', async (req, res) => {
  res.setHeader('Content-Type', 'text/html');

  const [html] = await render(req.originalUrl);

  res.end(template.replace('<!--app-html-->', html));
});

(async function main() {
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}());
