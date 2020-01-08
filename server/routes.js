export default (app) => {
  app.get('/', (_req, res) => {
  // res.set('content-type', 'text/html')
    res.render('index');
  })
}
