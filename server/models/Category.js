'use strict';

module.exports = (db, DataTypes) => {
  const Category = db.define('Category', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50000],
      },
    },
  }, {
      tableName: 'category',
      timestamps: false,
  });

  Category.associate = (models) => {
    models.Category.belongsToMany(models.Post, { through: 'post_categories' })
  };

  return Category;
};
