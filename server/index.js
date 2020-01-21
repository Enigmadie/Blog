import path from 'path';
import Express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import addRoutes from './routes';

const rootPath = path.join(__dirname, '../dist');
const mongoUrl = "mongodb+srv://blogUser:945870@cluster0-3pmqe.mongodb.net/test?retryWrites=true&w=majority";
const dbClient = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const app = new Express();
app.set('view engine', 'pug');
app.use('/assets', Express.static(rootPath));
// const upload = multer({ storage: multer.memoryStorage() })
app.use(Express.json());
app.use(cors());
app.use(fileUpload());
dbClient.connect((err) => {
  const dbCollection = dbClient.db('blog').collection('posts_data');
  addRoutes(app, dbCollection);
});

export default app;
