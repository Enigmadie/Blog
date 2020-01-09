import path from 'path';
import Express from 'express';
import addRoutes from './routes';

const rootPath = path.join(__dirname, '../dist');
// const appPath = path.join(__dirname, '..');

export default () => {
  console.log(rootPath)
  const app = new Express();
  app.set('view engine', 'pug');
  app.use('/assets', Express.static(rootPath));
  addRoutes(app);
  return app;
}
