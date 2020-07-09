#!/usr/bin/env node

const Express = require('express'),
    cors = require('cors'),
    path = require('path'),
    fileUpload = require('express-fileupload'),
    session = require('express-session'),
    db = require('./models'),
    { Storage } = require('@google-cloud/storage');
    require('dotenv').config();

const port = process.env.PORT || 5000;

const googleCloud = new Storage({
  keyFilename: path.join(__dirname, './gstore.json'),
  projectId: 'inlaid-reach-266916',
})

db.sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(`Error: ${err}`))

const bucket = googleCloud.bucket('blog-enigma');

module.exports = bucket;

const app = new Express();

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
