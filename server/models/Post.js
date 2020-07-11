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
    created_at: {
      type: DataTypes.DATE,
    },
    image: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'post',
    timestamps: false,
    underscored: true,
  });

  Post.associate = (models) => {
    models.Post.belongsToMany(models.Category, { through: models.PostCategories })
  };

  return Post;
};

