import { ObjectId } from 'mongodb';

const state = {
  isAdmin: true,
  mode: 'base',
  posts: [],
  activePost: '',
  editedPost: '',
};

export default (app, dbCollection) => {
  app.get('/', async (_req, res) => {
    state.mode = 'base';
    state.posts = await dbCollection.find({}).toArray();
    await res.render('index', { gon: state });
  });

  app.get('/posts/new', (_req, res) => {
    state.mode = 'filling';
    res.render('index', { gon: state });
  });

  app.get('/posts/:id', async (_req, res) => {
    const { id } = _req.params;
    const currentPost = await dbCollection.find({ _id: ObjectId(id) }).toArray();
    state.activePost =  currentPost[0];
    state.mode = 'post';
    await res.render('index', { gon: state });
  });

  app.get('/posts/edit/:id', async (_req, res) => {
    const { id } = _req.params;
    const currentPost = await dbCollection.find({ _id: ObjectId(id) }).toArray();
    state.editedPost = currentPost[0];
    state.mode = 'filling';
    await res.render('index', { gon: state });

  });

  app.post('/posts/new', (_req, res) => {
    const postData = {
      title: _req.body.title,
      content: _req.body.content,
    }

    if (_req.files) {
      const imgPath = `./uploads/${_req.files.image.name}`
      _req.files.image.mv(imgPath);
      postData.image = imgPath.slice(1);
    }
    dbCollection.insertOne(postData);
    res.redirect('/')
  });


  app.delete('/:id', (_req, res) => {
    const { id } = _req.params;
    dbCollection.deleteOne({ _id: ObjectId(id) })
    res.send(id)
  })
}
