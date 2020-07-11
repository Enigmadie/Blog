const _ = require('lodash');

const mapPosts = (posts) => posts.map((post) => {
  post.categories = post.categories.map((el) => ({ value: el, label: el }));
  return post;
});

const getFinderOptions = (query) => {
  const keys = Object.keys(query);
  const finderOptions = {};

  const querySelector = [
    {
      key: 'page',
      action: (page) => page,
    },
    {
      key: 'limit',
      action: (limit) => limit,
    },
    {
      key: 'offset',
      action: (skip) => skip,
    },
    {
      key: 'id',
      action: (id) => id,
    },
    {
      key: 'order',
      action: (row) => {
        const order = (row[0] !== '!') ? 'DESC' : 'ASC';
        return [ [ row, order ] ]
      }
    },
  ];

  keys.forEach((item) => {
    const findedKey = _.find(querySelector, { key: item });
    finderOptions[item] = findedKey.action(query[item]);
  });

  return finderOptions;
};

module.exports = { mapPosts, getFinderOptions };
