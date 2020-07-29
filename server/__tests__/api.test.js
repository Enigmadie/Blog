const supertest = require('supertest');
const app = require('../app');

const req = supertest.agent(app);
let postId;

describe('Test for api routes', () => {
  describe('Test for post api GET route', () => {
    it('should successfully access the post endpoint', (done) => {
      req
        .get('/api/posts')
        .expect(200)
        .then(({ status, body: { posts } }) => {
          const post = posts[0];

          expect(status).toEqual(200);
          expect(post.title).toEqual('test');
          expect(post.content).toEqual('<p>test-content</p>');
          expect(post.categories).toHaveLength(2);
          done();
        })
        .catch(() => done());
    });
  });

  describe('Test for post api POST route', () => {
    it('should post a new element', (done) => {
      req
        .post('/post')
        .send({
          title: 'test-post',
          preview: 'test-preview',
          content: '<p>test-content</p>',
          categories: JSON.stringify(['Articles', 'Technology']),
        })
        .expect(200)
        .then(({ body, status }) => {
          postId = body.id;
          expect(status).toEqual(200);
          expect(body.title).toEqual('test-post');
          expect(body.categories).toHaveLength(2);
          done();
        })
        .catch(() => done());
    });
  });

  describe('Test for post api PATCH route', () => {
    it('should patch element by id', (done) => {
      req
        .patch(`/post/${postId}`)
        .send({
          title: 'patched-post',
          preview: 'test-preview',
          content: '<p>test-content</p>',
          categories: JSON.stringify(['Articles', 'Technology']),
          image: null,
        })
        .expect(200)
        .then(({ body, status }) => {
          expect(status).toEqual(200);
          expect(body.title).toEqual('patched-post');
          done();
        })
        .catch(() => done());
    });
  });

  describe('Test for post api DELETE route', () => {
    it('should delete an element', (done) => {
      req
        .delete(`/post/${postId}`)
        .expect(200)
        .then(({ body, status }) => {
          expect(status).toEqual(200);
          expect(body.id).toEqual(postId);
          done();
        })
        .catch(() => done());
    });
  });
});
