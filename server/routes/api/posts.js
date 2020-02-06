var router = require('express').Router(),
    domain = require('../../index'),
    Post = require('../../models/Post').default;

router.get('/', function(_req, res) {
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


router.get('/new', function(_req, res) {
  res.render('index', { domain });
});

router.post('/new', function(_req, res) {
var { admin } = _req.session; 
var { title, content, preview } = _req.body;
if (admin) {
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
  return;
}
res.status(422);
});

module.exports = router;

