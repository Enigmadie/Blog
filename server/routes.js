import { ObjectId } from 'mongodb';
import Admin from './entities/Admin';
import Post from './entities/Post';

export default async (app, dbCollection, appData) => {
  app.get('/posts', async (_req, res) => {
    const posts = await dbCollection.find({}).toArray();
    const isAdmin = _req.session.admin;
    const currentPage = _req.query.page;
    await res.send({ posts, isAdmin, currentPage });
  });

  app.get('*', (_req, res) => {
    res.render('index', { domain: appData.domain });
  });

  app.post('/posts/new', (_req, res) => {
    const { title, content, preview } = _req.body;
    if (_req.files) {
      const imgPath = `./uploads/${_req.files.image.name}`
      _req.files.image.mv(imgPath);
    }
    const image = _req.files ? `/uploads/${_req.files.image.name}` : null;
    const post = new Post(title, content, preview, image, new Date())

    dbCollection.insertOne(post);
    res.send(post);
  });

  app.post('/admin', (_req, res) => {
    const { login, password } = _req.body.data;
    const admin = new Admin(login, password);
    const hasAccess = admin.checkAccess();
    _req.session.admin = hasAccess;
    res.send(hasAccess);
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
