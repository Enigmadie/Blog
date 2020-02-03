var ObjectId = require('mongodb').ObjectId,
    Admin = require('./entities/Admin').default,
    Post = require('./entities/Post').default;

exports.default = async function(app, dbCollection, appData) {
  app.get('/posts', async function(_req, res) {
    var posts = await dbCollection.find({}).toArray();
    var isAdmin = _req.session.admin;
    var currentPage = _req.query.page;
    await res.send({ posts, isAdmin, currentPage });
  });

  app.get('*', function(_req, res) {
    res.render('index', { domain: appData.domain });
  });

  app.post('/posts/new', function(_req, res) {
    var { title, content, preview } = _req.body;
    if (_req.files) {
      var imgPath = `./uploads/${_req.files.image.name}`
      _req.files.image.mv(imgPath);
    }
    var image = _req.files ? `/uploads/${_req.files.image.name}` : null;
    var post = new Post(title, content, preview, image, new Date())

    dbCollection.insertOne(post);
    res.send(post);
  });

  app.post('/admin', function(_req, res) {
    var { login, password } = _req.body.data;
    var admin = new Admin(login, password);
    var hasAccess = admin.checkAccess();
    _req.session.admin = hasAccess;
    res.send(hasAccess);
  });

  app.patch('/:id', async function(_req, res) {
    var { id } = _req.params;
    var { title, content } = _req.body;
    await dbCollection.updateOne({ _id: ObjectId(id) }, {
      $set: { title, content }
    });
    res.redirect('/')
  });

  app.delete('/:id', function(_req, res) {
    var { id } = _req.params;
    dbCollection.deleteOne({ _id: ObjectId(id) })
    res.send(id)
  })
};

