module.exports = (db, DataTypes) => {
  const User = db.define('User', {
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        len: [1, 60],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50000],
      },
    },
  }, {
    tableName: 'user',
    timestamps: true,
    underscored: true,
  });

  return User;
};
