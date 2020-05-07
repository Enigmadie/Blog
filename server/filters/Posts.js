class Posts {
  constructor(query, model) {
    this.query = query;
    this.model = model;
  }

  async getPosts() {
    if (this.query.id) {
      const post = await this.model.findOne({ _id: this.query.id });
      return post;
    } else {
      const limit = Number(this.query.limit);

      const skip = limit * (Number(this.query.page) - 1);
      const posts = await this.model.find({}).sort({ _id: 'desc' }).skip(skip).limit(limit);
      return posts;
    }
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
