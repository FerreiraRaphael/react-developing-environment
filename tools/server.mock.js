import jsonServer from 'json-server';
import path from 'path';

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, '../src/api/db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running');
});
