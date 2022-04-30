import path from 'path';
import fs from 'fs';
import express from 'express';

const server = express();
const port = 3000;

const html = path.join(__dirname, 'index.html');

server.use(express.static(__dirname, {
  index: false,
}));

server.get('*', (_req, res) => {
  res.setHeader('Content-Type', 'text/html');
  fs.createReadStream(html).pipe(res);
});

(async function main() {
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}());
