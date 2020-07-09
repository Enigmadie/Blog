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
      type: DataTypes.STRING,
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
    createdAt: {
      type: DataTypes.DATE,
    },
    image: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'post',
    timestamps: false,
  });

  Post.associate = (models) => {
    models.Post.belongsToMany(models.Category, { through: 'post_categories' })
  };

  return Post;
};

