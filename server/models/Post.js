'use strict';

const getFinderOptions = require('../utils'),
  _ = require('lodash');

module.exports = (db, DataTypes) => {
  const Post = db.define('Post', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 60],
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 50000],
      },
    },
    preview: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 350],
      },
    },
    image: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'post',
    timestamps: true,
    underscored: true,
  });

  Post.associate = (models) => {
    models.Post.belongsToMany(models.Category, {
      through: models.PostCategories,
      as: 'categories',
      foreignKey: 'post_id',
      otherKey: 'category_id',
    });

    models.Post.hasMany(models.Comment, {
      as: 'comments',
    });
  };

  Post.getPosts = async (query, models) => {
    const category = query.category;
    const omitedQuery = _.omit(query, 'category');
    const finderOptions = getFinderOptions(omitedQuery);

    finderOptions.include = [{
      model: models.Category,
      as: 'categories',
      attributes: ['category'],
      where: category ? { category } : null,
      through: {
        attributes: [],
      }
    }];

    const posts = await models.Post.findAll(finderOptions);
    return posts;
  };

  Post.getCount = async (models) => {
    const { count } = await models.Post.findAndCountAll({});
    return count;
  };

  return Post;
};

