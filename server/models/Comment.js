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
      as: 'post',
      foreignKey: 'postId',
    });

    models.Comment.belongsTo(models.Profile, {
      foreignKey: 'profileId',
      as: 'profile',
    });
  };

  Comment.getComments = async (query, models) => {
    const finderOptions = getFinderOptions(query);
    finderOptions.attributes = ['id', 'content', 'createdAt', 'updatedAt'];

    finderOptions.include = [{
      model: models.Profile,
      as: 'profile',
      attributes: ['id', 'login', 'avatarSmall', 'avatar', 'isAdmin'],
    }];

    const comments = await models.Comment.findAll(finderOptions);
    return comments;
  };

  Comment.getCount = async (models) => {
    const { count } = await models.Comment.findAndCountAll({});
    return count;
  };

  return Comment;
};
