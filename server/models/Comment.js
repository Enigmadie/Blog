'use strict';

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

  return Comment;
};

