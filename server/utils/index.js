const _ = require('lodash');

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
      key: 'order',
      action: (row) => {
        const order = (row[0] !== '!') ? 'DESC' : 'ASC';
        return [[row, order]];
      },
    },
  ];

  keys.forEach((item) => {
    const findedKey = _.find(querySelector, { key: item });
    if (findedKey) {
      finderOptions[item] = findedKey.action(query[item]);
    } else {
      if (!finderOptions.where) {
        finderOptions.where = {};
      }
      finderOptions.where[item] = query[item];
    }
  });

  return finderOptions;
};

module.exports = getFinderOptions;
