import path from 'path';
import Express from 'express';
import addRoutes from './routes';

const pathway = path.join(__dirname, '/public');

export default () => {
  console.log(pathway)
  const app = new Express();
  app.set('view engine', 'pug');
  app.use('/assets', Express.static(pathway));
  addRoutes(app);
  return app;
}
