#!/usr/bin/env node

const Express = require('express'),
    cors = require('cors'),
    path = require('path'),
    fileUpload = require('express-fileupload'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    { Storage } = require('@google-cloud/storage');
    require('dotenv').config();

const port = process.env.PORT || 5000;

const mongoUrl = process.env.DB_URL;

const googleCloud = new Storage({
  keyFilename: path.join(__dirname, './gstore.json'),
  projectId: 'inlaid-reach-266916',
})

const bucket = googleCloud.bucket('blog-enigma');
module.exports = bucket;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDb connected'))
  .catch((err) => console.log(err));

// const isProduction = process.env.NODE_ENV === 'production';
// const isDevelopment = !isProduction;

const app = new Express();

// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'index.pug'));
// app.use('/assets', Express.static(rootPath));
app.use(Express.json());
app.use(fileUpload());
app.use(cors({
  origin: true,
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
