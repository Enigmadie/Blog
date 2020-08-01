module.exports = (db, DataTypes) => {
  const Profile = db.define('Profile', {
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
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
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    tableName: 'profile',
    timestamps: true,
    underscored: true,
  });

  Profile.getProfiles = async (models) => {
    const profiles = await models.Profile.findAll({});
    return profiles;
  };

  return Profile;
};
