#!/usr/bin/env node

const Express = require('express');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const { Storage } = require('@google-cloud/storage');
const db = require('./models');
require('dotenv').config();

const googleCloud = new Storage({
  keyFilename: path.join(__dirname, './gstore.json'),
  projectId: 'inlaid-reach-266916',
});

db.sequelize.authenticate()
  .catch((err) => console.log(`Error: ${err}`));

if (process.env.NODE_ENV === 'tes') {
  console.log(222);
}

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

module.exports = app;
