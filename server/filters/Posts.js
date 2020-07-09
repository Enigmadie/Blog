const mapPosts = require('../utils');

class Posts {
  constructor(query, model) {
    this.query = query;
    this.model = model;
  }

  async getPosts() {
    const nameSelector = {
      post: async () => {
        const post = await this.model.findOne({ _id: this.query.id });
        return post;
      },
      main: async () => {
        const limit = Number(this.query.limit);
        const skip = limit * (Number(this.query.page) - 1);
        const posts = await this.model.findAll({
          order: [ [ 'createdAt', 'DESC' ] ],
          offset: skip,
          limit: limit,
        });
      return posts;
      },
      category: async () => {
        const limit = Number(this.query.limit);
        const posts = await this.model.find({categories: {$in: this.query.category}}).limit(limit);
        return mapPosts(posts);
      }
    }
    return nameSelector[this.query.name]();
  }

  async getCount() {
    const { count } = await this.model.findAndCountAll({});
    return count;
  }
}

exports.default = Posts;
