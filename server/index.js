#!/usr/bin/env node

var path = require('path'),
    Express = require('express'),
    cors = require('cors'),
    fileUpload = require('express-fileupload'),
    session = require('express-session'),
    mongoose = require('mongoose');
    require('dotenv').config();

var port = process.env.PORT || 5000;

var rootPath = path.join(__dirname, '/client/dist/public');

var mongoUrl = process.env.DB_URL;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDb connected'))
  .catch((err) => console.log(err));

var isProduction = process.env.NODE_ENV === 'production';
var isDevelopment = !isProduction;

var app = new Express();
var domain = isDevelopment ? 'http://localhost:8080' : '';
module.exports = domain;

app.set('view engine', 'pug');
console.lot('test')
// app.set('views', path.join(__dirname, 'index.pug'));
app.use('/assets', Express.static(rootPath));
app.use(Express.json());
app.use(fileUpload());
app.use(cors({
  origin: '*',
  credentials: true,
}))
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'secret key',
}));

app.use(require('./routes/index'));

app.listen(port, function() {
  console.log(`Server was started on ${port}`);
});
