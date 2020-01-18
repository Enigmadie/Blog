const state = {
  isAdmin: false,
  mode: 'base',
};

export default (app, dbCollection) => {
  app
    .get('/', async (_req, res) => {
      state.posts = await dbCollection.find({}).toArray();
      await res.render('index', { gon: state });
    })
  app.post('/', (_req, res) => {
      console.log(_req.body)
      console.log(_req.files)
      console.log(_req.file);
      console.log(_req)
      // console.log(_req)
      // dbCollection.insertOne(_req.body.data);
      res.redirect('/');
    })
}
