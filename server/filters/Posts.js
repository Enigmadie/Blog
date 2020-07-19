const getFinderOptions = require('../utils'),
  _ = require('lodash');

class Posts {
  constructor(query, model) {
    this.query = query;
    this.model = model;
  }

  async getPosts(associateModel) {
    const category = this.query.category;
    const omitedQuery = _.omit(this.query, 'category');
    const finderOptions = getFinderOptions(omitedQuery);

    finderOptions.include = [{
      model: associateModel,
      as: 'categories',
      attributes: ['category'],
      where: category ? { category } : null,
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
