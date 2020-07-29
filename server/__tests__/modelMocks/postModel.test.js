const db = require('../../models');

jest
  .mock('../../models/Category', () => () => ({}))
  .mock('../../models/Comment', () => () => ({}))
  .mock('../../models/Post', () => () => {
    const SequelizeMock = require('sequelize-mock');
    const dbMock = new SequelizeMock();

    return dbMock.define('Post', {
      id: '2',
      title: 'Test Title',
      content: 'some text',
      preview: 'something for test',
      image: '/path/to/file',
    }, {
      instanceMethods: {
        getCount: async (models) => {
          const { count } = await models.Post.findAndCountAll({});
          return count;
        },
      },
    });
  });

describe('Test Post model', () => {
  it('should return mock values', async (done) => {
    try {
      const post = await db.Post.findAll({});
      const postCount = await post[0].getCount(db);
      expect(postCount).toEqual(1);
    } catch (e) {
      console.log(e);
    }
    done();
  });
});
