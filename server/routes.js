import { ObjectId } from 'mongodb';


export default async (app, dbCollection) => {
  console.log('test')
    const state = {
      activePost: '',
      editedPost: '',
      isAdmin: '',
      posts: await dbCollection.find({}).toArray(),
    }
  app.get('/', (_req, res) => {
    res.render('index', { gon: state });
  });

  app.get('/new', (_req, res) => {
    state.editedPost = '';
    res.render('index', { gon: state });
  });

  app.get('/posts/:id', async (_req, res) => {
    const { id } = _req.params;
    const currentPost = await dbCollection.find({ _id: ObjectId(id) }).toArray();
    state.activePost =  currentPost[0];
    await res.render('index', { gon: state });
  });

  app.get('/posts/edit/:id', async (_req, res) => {
    const { id } = _req.params;
    const currentPost = await dbCollection.find({ _id: ObjectId(id) }).toArray();
    state.editedPost = currentPost[0];
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
    res.send(postData);
    // res.redirect('/')
  });

  app.patch('/posts/edit/:id', async (_req, res) => {
    const { id } = _req.params;
    const { title, content } = _req.body;
    await dbCollection.updateOne({ _id: ObjectId(id) }, {
      $set: { title, content }
    });
    res.redirect('/')
  });

  app.delete('/:id', (_req, res) => {
    const { id } = _req.params;
    dbCollection.deleteOne({ _id: ObjectId(id) })
    res.send(id)
  })
}
