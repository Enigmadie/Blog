'use strict';

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

  return Post;
};

