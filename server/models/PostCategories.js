module.exports = (db, DataTypes) => {
  const PostCategories = db.define('PostCategories', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'post_categories',
    timestamps: false,
    underscored: true,
  });
  return PostCategories;
};
