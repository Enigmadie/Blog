const buildState = (defaultState, dbCollection) => {
  const state = {
    isAdmin: false,
    mode: 'base',
  }
  return state;
}
export default (app, dbCollection, defaultState = {}) => {
  const state = buildState(defaultState, dbCollection);
  app
    .get('/', (_req, res) => {
      res.render('index');
    })
    app.post('/', (_req, res) => {
      console.log(_req.body);
      dbCollection.insert(_req.body.data);
    })
}
