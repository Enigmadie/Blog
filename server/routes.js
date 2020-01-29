import { ObjectId } from 'mongodb';

const getState = async (dbCollection) => ({
    posts: await dbCollection.find({}).toArray(),
  })
export default async (app, dbCollection, appData) => {

  app.get('/posts', async (_req, res) => {
    const state = await getState(dbCollection);
    await res.send(state);
  });

  app.get('*', (_req, res) => {
    res.render('index', { domain: appData.domain });
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

  app.post('/admin', (_req, res) => {
    const { login, password } = _req.body.data;
    if (login === 'admin' && password === 'testtest') {
      res.send(true);
    } else {
      res.send(false);
    }
  });

  app.patch('/edit/:id', async (_req, res) => {
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
