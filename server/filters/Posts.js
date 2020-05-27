const mappedPosts = require('../utils');

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
        const posts = await this.model.find({}).sort({ _id: 'desc' }).skip(skip).limit(limit);
      return mappedPosts(posts);
      },
      category: async () => {
        const limit = Number(this.query.limit);
        const posts = await this.model.find({categories: {$in: this.query.category}}).limit(limit);
        return mappedPosts(posts);
      }
    }
    return nameSelector[this.query.name]();
  }

  async getCount() {
    const postsCount = await this.model.countDocuments({}, function(e, posts) {
      if (e) {
        throw e;
      }
      return posts;
    });
    return postsCount;
  }
}

exports.default = Posts;
