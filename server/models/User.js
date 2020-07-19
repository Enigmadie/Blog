// const mongoose = require('mongoose');

// const adminLogin = 'admin';
// const adminPassword = 'testtest';

// const adminSchema = new mongoose.Schema({
//   login: String,
//   password: String,
// });

// adminSchema.methods.checkAccess = function() {
//   return this.login === adminLogin && this.password === adminPassword
// };

// exports.default = mongoose.model('Admin', adminSchema);

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
