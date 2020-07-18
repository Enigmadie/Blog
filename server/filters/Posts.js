const getFinderOptions = require('../utils');

class Posts {
  constructor(query, model) {
    this.query = query;
    this.model = model;
  }

  async getPosts(associateModel) {
    const finderOptions = getFinderOptions(this.query);
    const isCategory = this.query.category;

    finderOptions.include = [{
      model: associateModel,
      as: 'categories',
      attributes: ['category'],
      where: isCategory ? { category: this.query.category } : null,
      through: {
        attributes: [],
      }
    }];

    const posts = await this.model.findAll(finderOptions);
    return posts;
  }

  async getCount() {
    const { count } = await this.model.findAndCountAll({});
    return count;
  }
};

exports.default = Posts;
