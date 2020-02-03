#!/usr/bin/env node

var path = require('path'),
    Express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    cors = require('cors'),
    fileUpload = require('express-fileupload'),
    session = require('express-session'),
    addRoutes = require('./routes').default;

var port = process.env.PORT || 5000;

var rootPath = path.join(__dirname, '../client/dist/public');

var mongoUrl = "mongodb+srv://blogUser:945870@cluster0-3pmqe.mongodb.net/test?retryWrites=true&w=majority";

var dbClient = new MongoClient(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var isProduction = process.env.NODE_ENV === 'production';
var isDevelopment = !isProduction;

var app = new Express();
var domain = isDevelopment ? 'http://localhost:8080' : '';

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/../client'));
console.log(__dirname + '/../client/views')
app.use('/assets', Express.static(rootPath));
app.use(Express.json());
app.use(fileUpload());
app.use(cors())
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'secret key',
}));

dbClient.connect(function (err) {
  var dbCollection = dbClient.db('blog').collection('posts_data');
  addRoutes(app, dbCollection, { domain });
});

app.listen(port, function() {
  console.log(`Server was started on ${port}`);
});
