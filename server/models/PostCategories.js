'use strict';

module.exports = (db, DataTypes) => {
  const PostCategories = db.define('PostCategories', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    postId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    }
  }, {
      tableName: 'post_categories',
      timestamps: false,
  });
  return PostCategories;
};
