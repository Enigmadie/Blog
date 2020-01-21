import { ObjectId } from 'mongodb';

const state = {
  isAdmin: true,
  mode: 'base',
};

export default (app, dbCollection) => {
  console.log(state)
  app.get('/', async (_req, res) => {
    state.mode = 'base';
    state.posts = await dbCollection.find({}).toArray();
    await res.render('index', { gon: state });
  });

  app.get('/posts/new', (_req, res) => {
    state.mode = 'post';
    res.render('index', { gon: state });
  });

  app.get('/posts/:id', (_req, res) => {
    const { id } = _req.params;
    state.activePost = id;
    state.mode = 'post';
    res.render('index', { gon: state });
  });

  app.post('/', (_req, res) => {
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
  res.send(postData);
  });

  app.delete('/:id', (_req, res) => {
    const { id } = _req.params;
    dbCollection.deleteOne({ _id: ObjectId(id) })
    res.send(id)
  })
}
