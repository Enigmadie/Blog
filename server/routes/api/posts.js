var router = require('express').Router(),
    domain = require('../../'),
    Post = require('../../models/Post').default;

router.get('/', function(_req, res) {
  var page = _req.query.page ? _req.query.page : 1;
  var limit = 9;

  Post.countDocuments({}, function(e, count) {
    if (e) {
      throw e;
    }
    var skip = limit * (Number(page) - 1);
    Post.find({}).sort({ _id: 'desc' }).skip(skip).limit(limit).then(function(posts) {
      if (!posts) {
        res.status(422);
        return;
      }
      var isAdmin = _req.session.admin;
      res.send({ posts, postsCount: count, isAdmin, currentPage: page });
    });
  })
});


router.get('/new', function(_req, res) {
  res.render('index', { domain });
});

router.post('/new', function(_req, res) {
var { admin } = _req.session;
var { title, content, preview, date } = _req.body;
if (admin) {
  if (_req.files) {
    var imgPath = `../client/uploads/${_req.files.image.name}`
    _req.files.image.mv(imgPath);
  }
  var image = _req.files ? `/uploads/${_req.files.image.name}` : null;
  var post = new Post({
    title,
    content,
    preview,
    image,
    date,
  });

  post.save();
  res.send(post);
  return;
}
res.status(422);
});

module.exports = router;

