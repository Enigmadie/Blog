#!/usr/bin/env node

const path = require('path'),
    Express = require('express'),
    cors = require('cors'),
    fileUpload = require('express-fileupload'),
    session = require('express-session'),
    mongoose = require('mongoose');
    require('dotenv').config();

const port = process.env.PORT || 5000;

const rootPath = path.join(__dirname, '/client/dist/public');

const mongoUrl = process.env.DB_URL;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDb connected'))
  .catch((err) => console.log(err));

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

const app = new Express();
const domain = isDevelopment ? 'http://localhost:8080' : '';
module.exports = domain;

app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'index.pug'));
app.use('/assets', Express.static(rootPath));
app.use(Express.json());
app.use(fileUpload());
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'secret key',
}));
app.use(require('./routes/index'));

app.listen(port, function() {
  console.log(`Server was started on ${port}`);
});
