import path from 'path';
import Express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import session from 'express-session';
import addRoutes from './routes';


const rootPath = path.join(__dirname, '../dist/public');
const mongoUrl = "mongodb+srv://blogUser:945870@cluster0-3pmqe.mongodb.net/test?retryWrites=true&w=majority";
const dbClient = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

const app = new Express();
const domain = isDevelopment ? 'http://localhost:8080' : '';

app.set('view engine', 'pug');
app.use('/assets', Express.static(rootPath));
app.use(Express.json());
app.use(fileUpload());
app.use(cors())
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'secret key',
}));

dbClient.connect((err) => {
  const dbCollection = dbClient.db('blog').collection('posts_data');
  addRoutes(app, dbCollection, { domain });
});

export default app;
