var _ = require('lodash'),
    Admin = require('./models/Admin').default,
    Post = require('./models/Post').default;

exports.default = async function(app, appData) {
  app.get('/posts', function(_req, res) {
    Post.find({}).then(function(posts) {
      if (!posts) {
        res.status(422);
        return;
      }
      var isAdmin = _req.session.admin;
      var currentPage = _req.query.page;
      res.send({ posts, isAdmin, currentPage });
    });
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
    var post = new Post({
      title,
      content,
      preview,
      image,
      date: new Date()
    });

    post.save();
    res.send(post);
  });

  app.post('/admin', function(_req, res) {
    var { login, password } = _req.body.data;
    var admin = new Admin({ login, password });
    var hasAccess = admin.checkAccess();
    _req.session.admin = hasAccess;
    res.send(hasAccess);
  });

  app.patch('/:id', function(_req, res) {
    var { id } = _req.params;
    var { title, preview, content, image } = _req.body;
    var updateParams = {
      title,
      preview,
      content,
      image,
      date: new Date(),
    };
    Post.updateOne({ _id: id }, updateParams, {}, function(err) {
      if (err) {
        throw(err);
      }
      res.send(_.assign(updateParams, {_id: id }));
    });
  });

  app.delete('/:id', function(_req, res) {
    var { id } = _req.params;
    Post.deleteOne({ _id: id }, function(err) {
      if (err) {
        throw(err);
      }
      res.send(id)
    });
  });
};

