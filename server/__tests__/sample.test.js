const supertest = require('supertest'),
  db = require('../models'),
  app = require('../app');

const req = supertest.agent(app);

describe('Test for post route', () => {
  describe('Test for post route', () => {
    it('should successfully access the post endpoint', (done) => {
      req
        .get('/api/posts')
        .expect(200)
        .then((res) => {
          expect(res.status).toEqual(200);
          console.log(res.body)
          done();
        })
    });
  });
});
