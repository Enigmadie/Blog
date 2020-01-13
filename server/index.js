import path from 'path';
import Express from 'express';
import { MongoClient } from 'mongodb';
import addRoutes from './routes';

const rootPath = path.join(__dirname, '../dist');
const mongoUrl = "mongodb+srv://blogUser:945870@cluster0-3pmqe.mongodb.net/test?retryWrites=true&w=majority";
const dbClient = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const app = new Express();
app.set('view engine', 'pug');
app.use('/assets', Express.static(rootPath));
app.use(Express.json())

dbClient.connect((err) => {
  const dbCollection = dbClient.db('blog').collection('posts_data');
  addRoutes(app, dbCollection, {});
});

export default app;
