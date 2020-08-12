const getFinderOptions = require('../utils');

module.exports = (db, DataTypes) => {
  const Profile = db.define('Profile', {
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
      defaultValue: false,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 250],
      },
    },
    avatarSmall: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 250],
      },
    },
  }, {
    tableName: 'profile',
    timestamps: true,
    underscored: true,
  });

  Profile.associate = (models) => {
    models.Profile.hasMany(models.Comment, {
      as: 'comments',
    });
  };

  Profile.getProfiles = async (query, models) => {
    const finderOptions = getFinderOptions(query);
    const profiles = await models.Profile.findAll(finderOptions);
    return profiles;
  };

  return Profile;
};
