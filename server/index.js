#!/usr/bin/env node

var path = require('path'),
    Express = require('express'),
    cors = require('cors'),
    fileUpload = require('express-fileupload'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    addRoutes = require('./routes').default;

var port = process.env.PORT || 5000;

var rootPath = path.join(__dirname, '../client/dist/public');

var mongoUrl = "mongodb+srv://blogUser:945870@cluster0-3pmqe.mongodb.net/blog?retryWrites=true&w=majority";

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var isProduction = process.env.NODE_ENV === 'production';
var isDevelopment = !isProduction;

var app = new Express();
var domain = isDevelopment ? 'http://localhost:8080' : '';

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/../client'));
app.use('/assets', Express.static(rootPath));
app.use(Express.json());
app.use(fileUpload());
app.use(cors())
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'secret key',
}));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  addRoutes(app, { domain });
})

app.listen(port, function() {
  console.log(`Server was started on ${port}`);
});
