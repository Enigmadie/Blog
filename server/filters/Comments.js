const getFinderOptions = require('../utils');

class Comments {
  constructor(query, model) {
    this.query = query;
    this.model = model;
  }

  async getComments() {
    const finderOptions = getFinderOptions(this.query);
    const comments = await this.model.findAll(finderOptions);
    return comments;
  }

  async getCount() {
    const { count } = await this.model.findAndCountAll({});
    return count;
  }
};

exports.default = Comments;
