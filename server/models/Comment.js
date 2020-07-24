'use strict';

const getFinderOptions = require('../utils');

module.exports = (db, DataTypes) => {
  const Comment = db.define('Comment', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 50000],
      },
    },
  }, {
    tableName: 'comment',
    timestamps: true,
    underscored: true,
  });

  Comment.associate = (models) => {
    models.Comment.belongsTo(models.Post, {
      foreignKey: 'postId',
      as: 'post',
    });
  };

  Comment.getComments = async (query, models) => {
    const finderOptions = getFinderOptions(query);
    finderOptions.attributes = ['id', 'content', 'createdAt', 'updatedAt'];
    const comments = await models.Comment.findAll(finderOptions);
    return comments;
  };

  Comment.getCount = async (models) => {
    const { count } = await models.Comment.findAndCountAll({});
    return count;
  }

  return Comment;
};

